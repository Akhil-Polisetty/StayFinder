"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "../uploadimage/ImageUploader";

const Dashboard = () => {
  const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  const [formData, setFormData] = useState({
    roomtype: "",
    allowedtype: "",
    address: "",
    rent: "",
    notes: "",
    pics: "",
    rating: "4",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]); // State to hold selected images

  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageUpload = (uploadedImages) => {
    setImages(uploadedImages); // Store the uploaded images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { roomtype, allowedtype, address, rent, notes, rating, city } = formData;
    const ownerid = getCookieValue("objid");

    if (!ownerid || !roomtype || !allowedtype || !address || !rent || !rating) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    const requestBody = {
      ownerid,
      roomtype,
      allowedtype,
      address,
      rent,
      notes,
      pics: images, // Add images here
      rating,
      city,
    };

    console.log("Request Body:", requestBody); // For debugging

    try {
      const response = await fetch("/api/createroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Room details added successfully");
        setFormData({
          roomtype: "",
          allowedtype: "",
          address: "",
          rent: "",
          notes: "",
          pics: "",
          rating: "4",
          city: "",
        });
        setImages([]); // Reset images
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Error: Unable to submit");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-500 justify-center items-center">
      <div className="bg-green-500 relative bottom-8 p-4 font-calibri font-bold text-2xl">
        Dashboard
      </div>
      <form onSubmit={handleSubmit} className="bg-yellow-600 flex flex-col justify-center items-center gap-6 p-16 border-2 border-white rounded-md">
        <div>
          <label htmlFor="roomtype">Room Type: </label>
          <input
            type="text"
            id="roomtype"
            value={formData.roomtype}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="allowedtype">Allowed Type: </label>
          <input
            type="text"
            id="allowedtype"
            value={formData.allowedtype}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="rent">Rent: </label>
          <input
            type="number"
            id="rent"
            value={formData.rent}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="notes">Notes: </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="border px-2 py-1"
          />
        </div>

        <ImageUploader onImageUpload={handleImageUpload} /> {/* Pass image upload handler */}

        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <div className="loader"></div>
        ) : (
          <input
            type="submit"
            value="Submit Room Details"
            className="bg-blue-400 px-4 py-1 cursor-pointer"
            disabled={loading}
          />
        )}
      </form>

      {/* Add styles for the loader */}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
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

export default Dashboard;
