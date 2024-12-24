import React from "react";
// import Contact from "../contact/Contact";
const Navbar = () => {
  return (
    <>
      <div className="w-full flex justify-between gap-2 p-4 bg-cyan-600 cursor-pointer">
        <div>
          <a href="/">Rooms4U</a>
        </div>
        <div className=" flex gap-2">
          <a href="/pages/about">About</a>
          <a href="/pages/contact">Contact</a>
          <a href="/pages/login">Login</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
