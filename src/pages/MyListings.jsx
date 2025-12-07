import React, { useContext, useEffect, useMemo, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyListings = () => {
  useTitle("My Listings");
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const myListings = useMemo(
    () =>
      listings.filter(
        (item) =>
          (item.email || "").toLowerCase() ===
          (user?.email || "").toLowerCase()
      ),
    [listings, user]
  );

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

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this listing?");
    if (!ok) return;

    fetch(`${API_BASE}/listings/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setListings((prev) => prev.filter((item) => item._id !== id));
        toast.success("Listing deleted");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete listing");
      });
  };

  const handleUpdate = (id) => {
    toast("Update route will open here (to be implemented with backend).", {
      icon: "✏️",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Listings</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myListings.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-14 h-14">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>
                <td>{item.category}</td>
                <td>
                  {item.category === "Pets" || item.price === 0
                    ? "Free"
                    : `৳ ${Number(item.price || 0).toFixed(2)}`}
                </td>
                <td>{item.location}</td>
                <td>{item.date}</td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="btn btn-xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-xs btn-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {myListings.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 opacity-70">
                  You haven’t added any listings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListings;
