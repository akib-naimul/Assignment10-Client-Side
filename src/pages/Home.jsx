import React from "react";
import Banner from "../Components/Banner";
import CategoryCards from "../Components/CategoryCards";
import RecentListings from "../Components/RecentListings";

import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <div className="space-y-10">
      <Banner />

      <CategoryCards />

      <RecentListings />

      {/* Extra section 1: Why Adopt */}
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Why Adopt from PawMart?
          </h2>
          <p className="opacity-80 mb-3">
            Every listing you see on PawMart comes from real people: families,
            shelters, and small shops who care deeply about animal welfare.
          </p>
          <ul className="space-y-2 text-sm opacity-90">
            <li>✅ Give homeless pets a second chance.</li>
            <li>✅ Support responsible breeders & verified shops.</li>
            <li>✅ Reduce stray population with ethical adoption.</li>
            <li>✅ Access guidance on nutrition and pet care.</li>
          </ul>
        </div>
        <div className="card bg-base-100 shadow-lg border border-base-200 p-6">
          <h3 className="font-bold mb-2">Adoption Promise</h3>
          <p className="text-sm opacity-80">
            We encourage all owners to share health, vaccination and behavioral
            details so you can make an informed decision before bringing a pet
            home.
          </p>
        </div>
      </section>

      {/* Extra section 2: Pet Heroes */}
      <section className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Meet Our Pet Heroes</h2>
        <p className="text-sm opacity-80 max-w-2xl">
          These are community members who opened their hearts and homes to pets
          they found on PawMart.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              name: "Rafi & Milo",
              story:
                "Adopted a rescued street pup and now volunteers at local shelters.",
            },
            {
              name: "Maria & Luna",
              story:
                "Gave a senior cat a quiet and loving home after years at a shelter.",
            },
            {
              name: "Farhan & Coco",
              story:
                "Adopted a timid kitten and helped her grow into a confident companion.",
            },
            {
              name: "Nabila & Rocky",
              story:
                "Turned a shy rescue dog into the happiest hiking partner.",
            },
          ].map((hero) => (
            <div
              key={hero.name}
              className="card bg-base-100 shadow-md border border-base-200 p-4"
            >
              <h3 className="font-semibold mb-1">{hero.name}</h3>
              <p className="text-sm opacity-80">{hero.story}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
