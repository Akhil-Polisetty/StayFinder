"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const Logout = () => {

    const router = useRouter();
    // function handleLogout() {
    //     // Function to delete a specific cookie
    //     const deleteCookie = (cookieName) => {
    //         document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    //     };

    //     // Remove specific cookies
    //     deleteCookie("token"); // Replace "token" with the actual name of your token cookie
    //     deleteCookie("objid"); // Replace "objid" with the actual name of your objid cookie
    //     deleteCookie("email"); // Replace "objid" with the actual name of your objid cookie

    //     // Redirect or notify the user
    //     alert("You have been logged out.");
    //     router.push('/pages/login')
    //     // window.location.href = "/"; // Redirect to the homepage or login page
    // }
    const handleLogout = () => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('objid', { path: '/' });
        Cookies.remove('email', { path: '/' });
    
        alert('You have been logged out.');
        router.push('/pages/login');
      };

    return (
        <>
            <div className="cursor-pointer" onClick={handleLogout}>
            Logout
            </div>
        </>
    );
};

export default Logout;
