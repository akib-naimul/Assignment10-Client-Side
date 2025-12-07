import React, { useContext, useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ListingDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useTitle("Listing Details");

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderOpen, setOrderOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadListing = async () => {
      try {
        const res = await fetch(`${API_BASE}/listings/${id}`);
        const data = await res.json();
        if (!isMounted) return;
        setListing(data || null);
      } catch (err) {
        console.error(err);
        if (isMounted) toast.error("Failed to load listing");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadListing();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleOrder = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      productId: listing._id,
      productName: listing.name,
      buyerName: user?.displayName || "",
      email: user?.email,
      quantity:
        listing.category === "Pets"
          ? 1
          : Number(form.get("quantity") || 1),
      price: listing.price || 0,
      address: form.get("address"),
      phone: form.get("phone"),
      date: form.get("date"),
      additionalNotes: form.get("additionalNotes"),
    };

    setSubmitting(true);
    fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Order placed successfully");
        setOrderOpen(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to place order");
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="card bg-base-100 shadow">
        <figure className="p-6">
          <img
            src={listing.image}
            alt={listing.name}
            className="max-h-[420px] w-full object-cover rounded-xl"
          />
        </figure>
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{listing.name}</h1>
        <p className="opacity-80">
          <span className="font-semibold">Category:</span> {listing.category}
        </p>
        <p>
          <span className="font-semibold">Location:</span> {listing.location}
        </p>
        <p>
          <span className="font-semibold">Price:</span>{" "}
          {listing.category === "Pets" || listing.price === 0
            ? "Free for Adoption"
            : `৳ ${Number(listing.price || 0).toFixed(2)}`}
        </p>
        <p>
          <span className="font-semibold">Available Date:</span>{" "}
          {listing.date}
        </p>
        <div>
          <div className="font-semibold">Owner Email</div>
          <div className="opacity-80 text-sm">{listing.email}</div>
        </div>
        <p className="pt-2">{listing.description}</p>

        <button
          className="btn btn-primary mt-4"
          onClick={() => setOrderOpen(true)}
        >
          Adopt / Order Now
        </button>
      </div>

      {/* Order Modal */}
      {orderOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-4">
              Adopt / Order: {listing.name}
            </h3>
            <form onSubmit={handleOrder} className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Buyer Name</span>
                </label>
                <input
                  className="input input-bordered"
                  value={user?.displayName || ""}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  className="input input-bordered"
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product ID</span>
                </label>
                <input
                  className="input input-bordered"
                  value={listing._id}
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  className="input input-bordered"
                  value={listing.name}
                  readOnly
                />
              </div>

              {listing.category !== "Pets" && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Quantity</span>
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    defaultValue={1}
                    className="input input-bordered"
                  />
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  className="input input-bordered"
                  value={
                    listing.category === "Pets" || listing.price === 0
                      ? "Free for Adoption"
                      : `৳ ${Number(listing.price || 0).toFixed(2)}`
                  }
                  readOnly
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  name="address"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pickup Date</span>
                </label>
                <input
                  name="date"
                  type="date"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  name="phone"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Additional Notes</span>
                </label>
                <textarea
                  name="additionalNotes"
                  rows="3"
                  className="textarea textarea-bordered"
                  placeholder="Share any special requests or questions..."
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setOrderOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Submitting..." : "Confirm Order"}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOrderOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ListingDetails;
