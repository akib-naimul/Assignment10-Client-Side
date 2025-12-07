
import React, { useEffect, useMemo, useState } from "react";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PetsSupplies = () => {
  useTitle("Pets & Supplies");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [q, setQ] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadListings = async () => {
      try {
        const res = await fetch(`${API_BASE}/listings`);
        const data = await res.json();
        if (!isMounted) return;
        setListings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (isMounted) toast.error("Failed to load listings");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadListings();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...listings];

    if (categoryFilter !== "All") {
      list = list.filter((item) => item.category === categoryFilter);
    }

    const term = q.trim().toLowerCase();
    if (term) {
      list = list.filter((item) =>
        (item.name || "").toLowerCase().includes(term)
      );
    }

    return list;
  }, [listings, categoryFilter, q]);

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <h1 className="text-3xl font-bold">Pets & Supplies</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            className="input input-bordered w-full sm:w-72"
            placeholder="Search by name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="select select-bordered w-full sm:w-44"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
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
              <p className="text-sm opacity-80">{item.category}</p>
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
        {filtered.length === 0 && (
          <p className="col-span-full text-center opacity-70">
            No listings found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
