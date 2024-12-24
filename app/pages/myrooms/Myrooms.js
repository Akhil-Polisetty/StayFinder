"use client";
import React, { useState, useEffect } from "react";

const Myrooms = () => {
  const [rooms, setRooms] = useState([]); // State to hold the rooms data
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Function to get the cookie value
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
      return cookie ? cookie.split("=")[1] : null;
    };

    // Fetch rooms from API
    async function fetchMyRooms() {
      const ownerid = getCookieValue("objid"); // Retrieve objectid from cookie
      if (!ownerid) {
        setError("Owner ID is missing. Please log in.");
        setLoading(false); // Stop loading in case of missing owner ID
        return;
      }

      try {
        const res = await fetch(`/api/myrooms?ownerid=${ownerid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setRooms(data); // Set the fetched rooms to the state
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch rooms");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("An error occurred while fetching rooms.");
      } finally {
        setLoading(false); // Stop loading once the API call is done
      }
    }

    fetchMyRooms();
  }, []); // Only run once when the component mounts

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Message */}
      {loading && !error && (
        <div className="loader">Loading...</div> // Add a loading message or spinner
      )}

      {/* Render rooms list */}
      {rooms.length > 0 && !loading ? (
        <div className="flex flex-wrap gap-6 justify-center items-center p-4">
          {rooms.map((room, index) => (
            <div key={index} className="bg-yellow-600 p-6 rounded-md border-2 border-white w-80">
              <h3 className="text-xl font-bold mb-2">{room.roomtype}</h3>
              <p><strong>Allowed Type:</strong> {room.allowedtype}</p>
              <p><strong>Address:</strong> {room.address}</p>
              <p><strong>Rent:</strong> ₹{room.rent}</p>
              {room.notes && <p><strong>Notes:</strong> {room.notes}</p>}
              <p><strong>Rating:</strong> {room.rating} / 5</p>
            </div>
          ))}
        </div>
      ) : !loading && rooms.length === 0 ? (
        <p className="text-gray-500">No rooms found.</p>
      ) : null}
    </div>
  );
};

export default Myrooms;
