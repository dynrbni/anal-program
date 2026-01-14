import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // import react-hot-toast
import searchFeli from "../assets/search.svg";
import wishFeli from "../assets/heart.svg";
import cartFeli from "../assets/cart.svg";
import LoginFeli from "../LoginRegister/loginFeli";
import RegisterFeli from "../LoginRegister/registerFeli";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleRegisterSuccess = (user) => {
    setUser(user);
    setIsLoggedIn(true);
    setIsRegisterOpen(false);
  };

  useEffect(() => {
    const isAnyModalOpen = isLoginOpen || isRegisterOpen;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoginOpen, isRegisterOpen]);

  // handler untuk tombol wishlist dan cart
  const handleFailClick = () => {
    toast.error("Must Login First");
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 shadow-sm px-24 bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-6" />
        </div>

        <div className="flex-1 mx-7">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for brand, color, etc."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300"
            />
            <img
              src={searchFeli}
              alt="Search Icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-800">
          <a href="#" className="hover:underline">
            Seller
          </a>
          <a href="#" className="hover:underline">
            Delivery
          </a>
          <a href="#" className="hover:underline">
            Affiliate
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>

          {/* Tambahin onClick panggil toast error */}
          <img
            src={wishFeli}
            alt="Wishlist"
            className="h-6 w-6 cursor-pointer"
            onClick={handleFailClick}
          />
          <img
            src={cartFeli}
            alt="Cart"
            className="h-6 w-6 cursor-pointer"
            onClick={handleFailClick}
          />

          <button
            onClick={() => setIsLoginOpen(true)}
            className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-xl cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => setIsRegisterOpen(true)}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl cursor-pointer"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Pasang Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      <LoginFeli
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitch={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterFeli
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitch={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  );
};

export default Navbar;
