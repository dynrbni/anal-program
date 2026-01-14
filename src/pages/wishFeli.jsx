import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../component/navbarLoggedIn";
import toast from "react-hot-toast";

const wishFeli = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const convertToIDR = (usd) => {
    const rate = 16500;
    return `Rp ${Math.floor(usd * rate).toLocaleString("id-ID")}`;
  };

  const handleRemove = (id) => {
    const newWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    toast.success("Removed from wishlist!");
  };

  return (
    <>
      <Navbar />
       <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-500">Nothing wish at here.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 bg-white flex flex-col"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="text-sm font-semibold line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-primary font-bold text-sm mb-2">
                    {convertToIDR(item.price)}
                  </p>
                </Link>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="mt-auto text-xs text-red-500 border border-red-400 px-2 py-1 rounded hover:bg-red-50 transition cursor-pointer"
                >
                  Hapus dari Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default wishFeli;
