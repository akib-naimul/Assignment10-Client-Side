import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CategoryFiltered = () => {
  const { categoryName } = useParams();
  useTitle(`${categoryName} Listings`);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadCategoryListings = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/listings?category=${encodeURIComponent(categoryName)}`
        );
        const data = await res.json();
        if (!isMounted) return;
        setListings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (isMounted) toast.error("Failed to load category listings");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCategoryListings();

    return () => {
      isMounted = false;
    };
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        {categoryName} Listings ({listings.length})
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-md hover:shadow-lg border border-base-200 hover:border-primary/50 transition-all"
          >
            <figure className="p-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full object-cover rounded-xl"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="text-sm opacity-80">📍 {item.location}</p>
              <p className="font-semibold">
                {item.category === "Pets" || item.price === 0
                  ? "Free for Adoption"
                  : `৳ ${Number(item.price || 0).toFixed(2)}`}
              </p>
              <div className="card-actions justify-end">
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
        {listings.length === 0 && (
          <p className="col-span-full text-center opacity-70">
            No listings found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryFiltered;
