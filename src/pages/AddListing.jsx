import React, { useContext, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AddListing = () => {
  useTitle("Add Listing");
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const category = form.get("category");
    const price = Number(form.get("price") || 0);

    const payload = {
      name: form.get("name"),
      category,
      price: category === "Pets" ? 0 : price,
      location: form.get("location"),
      description: form.get("description"),
      image: form.get("image"),
      date: form.get("date"),
      email: user?.email,
    };

    setSubmitting(true);
    fetch(`${API_BASE}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Listing added successfully");
        e.target.reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add listing");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Add Listing</h1>

      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow p-6 grid md:grid-cols-2 gap-4"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product/Pet Name</span>
          </label>
          <input
            name="name"
            className="input input-bordered"
            required
            placeholder="Golden Retriever Puppy"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select name="category" className="select select-bordered" required>
            <option value="">Select category</option>
            <option>Pets</option>
            <option>Food</option>
            <option>Accessories</option>
            <option>Care Products</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="input input-bordered"
            placeholder="0 for adoption"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            name="location"
            className="input input-bordered"
            required
            placeholder="Dhaka"
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            name="image"
            type="url"
            className="input input-bordered"
            required
            placeholder="https://example.com/pet.jpg"
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Available Date (Pick Up)</span>
          </label>
          <input
            name="date"
            type="date"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            rows="4"
            className="textarea textarea-bordered"
            placeholder="Friendly 2-month-old puppy available for adoption..."
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Owner Email</span>
          </label>
          <input
            className="input input-bordered"
            value={user?.email || ""}
            readOnly
          />
        </div>

        <div className="md:col-span-2">
          <button className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Add Listing"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListing;
