import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/listings?limit=6`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (active) setListings(data || []);
      } catch (err) {
        console.error(err);
        if (active) toast.error("Failed to load recent listings");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Listings</h2>
        <div className="min-h-[120px] grid place-items-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold">Recent Listings</h2>
      {listings.length === 0 ? (
        <p className="opacity-70">No recent listings found.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md hover:shadow-lg border border-base-200"
            >
              <figure className="h-48 overflow-hidden bg-base-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="text-sm opacity-80">{item.category}</p>
                <p className="text-sm opacity-80">
                  <span className="font-semibold">Location:</span>{" "}
                  {item.location}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold">
                    {item.category === "Pets" || item.price === 0
                      ? "Free for Adoption"
                      : `৳${item.price}`}
                  </span>
                  <Link
                    to={`/listing/${item._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentListings;
