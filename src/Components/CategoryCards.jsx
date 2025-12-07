import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    key: "Pets",
    icon: "🐶",
    label: "Pets (Adoption)",
    desc: "Dogs, cats, birds & more waiting for homes.",
  },
  {
    key: "Food",
    icon: "🍖",
    label: "Pet Food",
    desc: "Nutritious meals for every life stage.",
  },
  {
    key: "Accessories",
    icon: "🧸",
    label: "Accessories",
    desc: "Beds, toys, leashes & more.",
  },
  {
    key: "Care Products",
    icon: "💊",
    label: "Pet Care Products",
    desc: "Grooming, medicine & hygiene.",
  },
];

const CategoryCards = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c) => (
          <Link
            key={c.key}
            to={`/category-filtered-product/${encodeURIComponent(c.key)}`}
            className="card bg-base-100 shadow-md hover:shadow-lg border border-base-200 hover:border-primary/50 transition-all"
          >
            <div className="card-body">
              <div className="text-3xl mb-2">{c.icon}</div>
              <h3 className="card-title">{c.label}</h3>
              <p className="text-sm opacity-80">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
