"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const GetRooms = () => {
  const [rooms, setRooms] = useState([]); // State to hold room data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(""); // State to manage errors
  const [city, setCity] = useState(""); // State to hold the city input by the user

  // Function to fetch rooms based on city
  const fetchRooms = async (city) => {
    if (!city) return; // Prevent fetching if city is empty
    try {
      const res = await fetch(`/api/searchroom?city=${city}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setRooms(data); // Set the fetched rooms in state
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to fetch rooms");
      }
    } catch (err) {
      setError("An error occurred while fetching rooms");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Trigger the API call when city changes or user submits
  const handleSearch = () => {
    setLoading(true); // Set loading to true when starting a new search
    fetchRooms(city); // Fetch rooms based on the city input
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 justify-center items-center">
      <div className="bg-green-500 text-white font-calibri font-bold text-2xl p-4 mb-6 rounded-lg shadow-lg">
        Welcome to Rooms4U
      </div>

      {/* Input for the city */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
          className="p-2 border-2 border-gray-300 rounded-md mr-2"
        />
        <button
          onClick={handleSearch} // Trigger the search when the button is clicked
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Search Rooms
        </button>
      </div>

      {loading ? (
        <div className="loader"></div> // Show loader while fetching rooms
      ) : error ? (
        <p className="text-red-500">{error}</p> // Display error message
      ) : rooms.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center items-center p-4">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-yellow-600 p-6 rounded-md border-2 border-white w-80 shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{room.roomtype}</h3>
              <p><strong>Allowed Type:</strong> {room.allowedtype}</p>
              <p><strong>Address:</strong> {room.address}</p>
              <p><strong>Rent:</strong> ₹{room.rent}</p>
              {room.notes && <p><strong>Notes:</strong> {room.notes}</p>}
              {room.pics.length > 0 && (
                <div className="flex gap-2 overflow-x-auto my-2">
                  {room.pics.map((pic, picIndex) => (
                    <Image
                      key={picIndex}
                      src={pic}
                      alt={`Room Pic ${picIndex + 1}`}
                      height={150}
                      width={150}
                      className="rounded-md shadow-md"
                    />
                  ))}
                </div>
              )}
              <p><strong>Rating:</strong> {room.rating} / 5</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No rooms found for the selected city.</p>
      )}

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

export default GetRooms;
