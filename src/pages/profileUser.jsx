import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import NavbarLogin from "../component/navbarLoggedIn";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const usersStr = localStorage.getItem("users");
    if (usersStr) {
      try {
        const users = JSON.parse(usersStr);
        if (users.length > 0) {
          setUser(users[0]); // ambil user pertama
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error parsing users data:", error);
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Please log in to see profile.</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarLogin />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
        <div className="flex items-center gap-2 mb-6">
          <img src="/user.svg" alt="User Icon" className="w-8 h-8" />
          <h1 className="text-3xl font-semibold">
            Welcome, {user.firstName} {user.lastName}
          </h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700">User ID:</label>
            <p>{user.id}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Username:</label>
            <p>{user.username}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">First Name:</label>
            <p>{user.firstName}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Last Name:</label>
            <p>{user.lastName}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Email:</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label className="block font-semibold text-gray-700">Phone:</label>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
