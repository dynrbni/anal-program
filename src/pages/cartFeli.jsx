import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../component/navbar";
import NavbarLogin from "../component/navbarLoggedIn";
import Cart from "../assets/cart.svg";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rate, setRate] = useState(16500); // default kurs IDR
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("users");
    setIsLoggedIn(!!token);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    fetch("https://api.exchangerate.host/latest?base=USD&symbols=IDR")
      .then((res) => res.json())
      .then((data) => {
        if (data.rates && data.rates.IDR) {
          setRate(data.rates.IDR);
        }
      })
      .catch((err) => console.error("Gagal ambil kurs:", err));
  }, []);

  const convertToIDR = (usd) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(usd * rate);

  const handleQuantityChange = (productId, newQty) => {
    if (newQty < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDelete = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSelectedItems((prev) => prev.filter((id) => id !== productId));
  };

  const handleDeleteSelected = () => {
    const updatedCart = cart.filter((item) => !selectedItems.includes(item.id));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSelectedItems([]);
  };

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const totalPrice = selectedItems.length
    ? cart
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.error("No product selected!");
      return;
    }

    const selectedCartItems = cart.filter((item) =>
      selectedItems.includes(item.id)
    );

    localStorage.setItem("checkoutItems", JSON.stringify(selectedCartItems));
    window.location.href = "/checkout";
  };

  return (
    <>
      {isLoggedIn ? <NavbarLogin /> : <Navbar />}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Cart Items + Select All */}
        <div className="md:col-span-2 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <img src={Cart} alt="Cart Icon" className="w-8 h-8" />
            <h2 className="text-3xl font-semibold">My Cart</h2>
          </div>

          {cart.length > 0 && (
            <div className="flex justify-between items-center mb-4 rounded-lg p-4 shadow">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cart.length}
                  onChange={toggleSelectAll}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm select-none">
                  Select all items ({cart.length})
                </span>
              </label>

              {selectedItems.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                >
                  Delete
                </button>
              )}
            </div>
          )}

          <div className="flex-grow overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded p-4 shadow"
                >
                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {convertToIDR(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1 cursor-pointer"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-12 text-center border border-gray-300 rounded"
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className=" text-red-500 hover:text-red-700"
                    >
                      <img src="/trash.svg" alt="" className="w-6 h-6 cursor-pointer"/>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right - Summary */}
        <div className=" border-2 border-primary rounded-lg p-4 shadow-xl h-fit sticky top-4 self-start mt-12">
          <h3 className="text-lg font-semibold mb-2">Shopping Summary</h3>
          <div className="text-sm mb-4">
            <p>
              Total Purchase:{" "}
              {selectedItems.length ? (
                <span className="text-xl font-bold ml-2">
                  {convertToIDR(totalPrice)}
                </span>
              ) : (
                <span className="text-gray-500 italic ml-2">-</span>
              )}
            </p>
          </div>
          <input
            type="text"
            placeholder="Add Promo or Voucher"
            className="w-full border px-3 py-2 rounded-md text-sm mb-3"
          />
          <button
            onClick={handleCheckout}
            className="bg-primary hover:bg-cyan-600 text-white w-full py-2 rounded-md text-sm font-bold cursor-pointer"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
