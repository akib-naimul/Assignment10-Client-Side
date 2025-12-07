
import React from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("404");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4 bg-base-200">
      <h1 className="text-6xl font-black">404</h1>
      <p className="opacity-70 text-xl">
        The page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
