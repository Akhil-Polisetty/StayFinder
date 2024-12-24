// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// const GetRooms = () => {
//   const [rooms, setRooms] = useState([]); // State to hold room data
//   const [loading, setLoading] = useState(true); // State to manage loading
//   const [error, setError] = useState(""); // State to manage errors

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await fetch("/api/searchroom?city=hyderabad", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setRooms(data); // Set the fetched rooms in state
//         } else {
//           const errorData = await res.json();
//           setError(errorData.message || "Failed to fetch rooms");
//         }
//       } catch (err) {
//         setError("An error occurred while fetching rooms");
//       } finally {
//         setLoading(false); // Stop loading regardless of success or failure
//       }
//     };

//     fetchRooms();
//   }, []);

//   console.log(rooms)

//   return (
//     <div className="w-full h-full flex flex-col bg-slate-500 justify-center items-center">
//       <div className="bg-green-500 relative bottom-8 p-4 font-calibri font-bold text-2xl">
//         Welcome to Rooms4U
//       </div>

//       {loading ? (
//         <div className="loader"></div> // Add a loading spinner
//       ) : error ? (
//         <p className="text-red-500">{error}</p> // Display error message
//       ) : rooms.length > 0 ? (
//         <div className="flex flex-wrap gap-6 justify-center items-center p-4">
//           {rooms.map((room, index) => (
//             <div
//               key={index}
//               className="bg-yellow-600 p-4 rounded-md border-2 border-white w-80"
//             >
//               <h3 className="text-xl font-bold">{room.roomtype}</h3>
//               <p><strong>Allowed Type:</strong> {room.allowedtype}</p>
//               <p><strong>Address:</strong> {room.address}</p>
//               <p><strong>Rent:</strong> ₹{room.rent}</p>
//               {room.notes && <p><strong>Notes:</strong> {room.notes}</p>}
//                {room.pics.length > 0 && (
//                 <div className="flex gap-2 overflow-x-auto">
//                   {room.pics.map((pic, picIndex) => (
//                     <Image
//                       key={picIndex}
//                       src={pic}
//                       alt={`Room Pic ${picIndex + 1}`}
//                       height="150"
//                       width="150"
//                     />
//                   ))}
//                 </div>
//               )} 
              
//               <p><strong>Rating:</strong> {room.rating} / 5</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No rooms found for the selected city.</p>
//       )}

//       {/* Add styles for the loader */}
//       <style jsx>{`
//         .loader {
//           border: 4px solid #f3f3f3; /* Light grey */
//           border-top: 4px solid #3498db; /* Blue */
//           border-radius: 50%;
//           width: 24px;
//           height: 24px;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GetRooms;


"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const GetRooms = () => {
  const [rooms, setRooms] = useState([]); // State to hold room data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(""); // State to manage errors

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/searchroom?city=hyderabad", {
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

    fetchRooms();
  }, []);

  console.log(rooms);

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 justify-center items-center">
      <div className="bg-green-500 text-white font-calibri font-bold text-2xl p-4 mb-6 rounded-lg shadow-lg">
        Welcome to Rooms4U
      </div>

      {loading ? (
        <div className="loader"></div> // Add a loading spinner
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
