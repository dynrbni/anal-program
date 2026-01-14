import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import searchFeli from "../assets/search.svg";
import wishFeli from "../assets/heart.svg";
import cartFeli from "../assets/cart.svg";
import { FaChevronDown } from "react-icons/fa";

const NavbarLogin = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = () => {
    navigate('/cart'); 
  };

  const homeClick = () => {
    navigate('/home');
  };

  const handleLogout = () => {
    // Simulasi logout
    localStorage.removeItem("users");
    navigate('/');
  };

  const profileClick = () => {
    navigate('/profile');
  };

  const historyClick = () => {
    navigate('/history');
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between p-4 shadow-sm px-24 bg-white sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img onClick={homeClick} src="/logo.svg" alt="Logo" className="h-6 cursor-pointer" />
        </div>

        {/* Search */}
        <div className="flex-1 mx-7">
          <div className="relative w-full">
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

        {/* Menu kanan */}
        <div className="flex items-center space-x-6 text-sm text-gray-800 relative">
          <a href="#" className="hover:underline">Seller</a>
          <a href="#" className="hover:underline">Delivery</a>
          <a href="#" className="hover:underline">Affiliate</a>
          <a href="#" className="hover:underline">Contact</a>

          <button onClick={handleWishlistClick}>
            <img src={wishFeli} alt="Wishlist" className="h-6 w-6 cursor-pointer" />
          </button>

          <button onClick={handleClick}>
            <img src={cartFeli} alt="Cart" className="h-6 w-6 cursor-pointer" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src="/user.svg"
                alt="User Profile"
                className="h-6 w-6 rounded-full"
                title="User"
              />
              <FaChevronDown className="text-gray-600 text-xs" />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                <ul className="text-sm text-gray-700">
                  <li
                    onClick={profileClick}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </li>
                  <li
                    onClick={historyClick}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    History
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarLogin;
