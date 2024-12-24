"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, conpassword } = formData;

    if (!name || !email || !password || !conpassword) {
      setError("All fields are required");
      return;
    }

    if (password !== conpassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true); // Start loading

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");
        setFormData({ name: "", email: "", password: "", conpassword: "" });
        router.push("/pages/login");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Error: Unable to register");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-500 justify-center items-center">
      <div className="bg-green-500 relative bottom-8 p-4 font-calibri font-bold text-2xl">
        Register Page
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-600 flex flex-col justify-center items-center gap-6 p-16 border-2 border-white rounded-md"
      >
        <div>
          <label htmlFor="name">Username: </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="email">Email ID: </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="conpassword">Confirm Password: </label>
          <input
            type="password"
            id="conpassword"
            value={formData.conpassword}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <div>
          Already have an account? <a href="/pages/login">Login</a>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <div className="loader"></div> // Add spinner while loading
        ) : (
          <input
            type="submit"
            value="Register"
            className="bg-blue-400 px-4 py-1 cursor-pointer"
            disabled={loading} // Disable button while loading
          />
        )}
      </form>

      {/* Add styles for the loader */}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3; /* Light grey */
          border-top: 4px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
