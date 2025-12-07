import React, { useContext, useState } from "react";
import useTitle from "../hooks/useTitle";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  useTitle("Register");
  const { register, googleLogin } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pw) => {
    if (pw.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(pw)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(pw)) {
      return "Password must contain at least one lowercase letter";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoURL = form.get("photoURL");
    const email = form.get("email");
    const password = form.get("password");

    const error = validatePassword(password);
    if (error) {
      toast.error(error);
      return;
    }

    setSubmitting(true);
    register(email, password, name, photoURL)
      .then(() => {
        toast.success("Account created successfully");
        navigate("/", { replace: true });
      })
      .catch(() => {})
      .finally(() => setSubmitting(false));
  };

  const handleGoogle = () => {
    setSubmitting(true);
    googleLogin()
      .then(() => {
        toast.success("Registered with Google");
        navigate("/", { replace: true });
      })
      .catch(() => {})
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow p-6">
      <h1 className="text-3xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          type="text"
          className="input input-bordered w-full"
          placeholder="Full Name"
        />
        <input
          name="photoURL"
          type="url"
          className="input input-bordered w-full"
          placeholder="Photo URL"
        />
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
          {submitting ? "Please wait..." : "Register"}
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
        Already have an account?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
