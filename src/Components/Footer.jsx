import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10 border-t border-base-300">
      <div className="container mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl grid place-items-center bg-primary text-primary-content font-bold">
              🐾
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              PawMart
            </span>
          </div>
          <p className="opacity-70 text-sm">
            PawMart connects local pet owners and buyers for adoption and pet
            care products.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-3">Useful Links</h3>
          <ul className="space-y-2 opacity-80 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pets-supplies">Pets & Supplies</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Community</h3>
          <ul className="space-y-2 opacity-80 text-sm">
            <li>Adoption Stories</li>
            <li>Pet Care Guides</li>
            <li>Breeder & Shop Partners</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Follow Us</h3>
          <div className="flex gap-3 text-xl">
            <a href="#" aria-label="Facebook">
              🌐
            </a>
            <a href="#" aria-label="Instagram">
              📷
            </a>
            <a href="#" aria-label="X">
              𝕏
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm opacity-70">
          <p>© {new Date().getFullYear()} PawMart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
