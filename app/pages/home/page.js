"use client";
import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import GetRooms from "../getrooms/GetRooms";
import Logout from "../logout/Logout";
import { useRouter } from "next/navigation";
import Myrooms from "../myrooms/Myrooms";
// import { useRouter } from "next/router";
const page = () => {
    const router=useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null);
      useEffect(() => {
    async function verifyUser() {
        try {
          const response = await fetch("/api/auth/verify", {
            method: "GET",
            credentials: "include", // Ensures cookies are sent with the request
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json(); // Parse JSON if available
      
          if (data.status) {
            setIsAuthorized(true); // User is authorized
          } else {
            alert(data.message || "You are not authorized");
            setIsAuthorized(false); // User is not authorized
            router.push("/pages/login"); // Redirect to login if unauthorized
          }
        } catch (error) {
          console.log("Error verifying user:", error);
      
          if (error instanceof SyntaxError) {
            // Handle empty or invalid JSON response
            console.log("Invalid JSON response from server");
          }
      
          setIsAuthorized(false);
          router.push("/pages/login");
        }
      }
      

    verifyUser();
  }, [router]);
  const [open, setOpen] = useState("");
  function handleClick() {
    setOpen("1");
  }
  function handleClick2() {
    setOpen("2");
  }
  function handleClick3() {
    setOpen("3");
  }
  if (isAuthorized === null) {
    // Optionally, display a loader while verifying
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-2 bg-cyan-200">
        <div
          onClick={handleClick}
          className="p-8 cursor-pointer border-2 border-slate-700"
        >
          Create a Room
          {open == "1" && <Dashboard />}
        </div>
        <div
          onClick={handleClick2}
          className="p-8 cursor-pointer border-2 border-slate-700"
        >
          Get Rooms
          {open == "2" && <GetRooms />}
        </div>
        <div
          onClick={handleClick3}
          className="p-8 cursor-pointer border-2 border-slate-700"
        >
          Myrooms
          {open == "3" && <Myrooms />}
        </div>

        {/* <div onClick={handleClick3} className='p-8 cursor-pointer border-2 border-slate-700'>
            
            {open=="3" && <Logout/>}
        </div> */}
        <Logout />
      </div>
    </>
  );
};

export default page;
