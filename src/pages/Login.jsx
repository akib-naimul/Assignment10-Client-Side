import React, { useContext, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  useTitle("Login");
  const { login, googleLogin } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    setSubmitting(true);
    login(email, password)
      .then(() => {
        toast.success("Logged in successfully");
        navigate(from, { replace: true });
      })
      .catch(() => {})
      .finally(() => setSubmitting(false));
  };

  const handleGoogle = () => {
    setSubmitting(true);
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from, { replace: true });
      })
      .catch(() => {})
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow p-6">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="email"
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
          required
        />
        <button className="btn btn-primary w-full" disabled={submitting}>
          {submitting ? "Please wait..." : "Login"}
        </button>
      </form>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogle}
        className="btn btn-outline w-full"
        disabled={submitting}
      >
        Continue with Google
      </button>
      <p className="pt-3 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="link">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
