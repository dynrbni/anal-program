import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../component/navbar";
import NavbarLogin from "../component/navbarLoggedIn";
import toast from "react-hot-toast";

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [rate, setRate] = useState(16500);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("users");
    setIsLoggedIn(!!token);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => toast.error("Failed to load product"));

    fetch("https://api.exchangerate.host/latest?base=USD&symbols=IDR")
      .then((res) => res.json())
      .then((data) => setRate(data.rates.IDR))
  }, [id]);

  if (!product)
    return <div className="text-center p-10">Loading product details...</div>;

  const stock = product.stock ?? 12;

  const convertToIDR = (usd) =>
    `Rp ${Math.floor(usd * rate).toLocaleString("id-ID")}`;

  const handleQuantityChange = (e) => {
    let val = e.target.value;
    let numVal = Number(val);
    if (isNaN(numVal) || val === "") {
      setQuantity("");
      return;
    }
    if (numVal < 1) numVal = 1;
    else if (numVal > stock) numVal = stock;
    setQuantity(numVal);
  };

  const handleMinus = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handlePlus = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : stock));
  };

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingIndex = cart.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed Add to Cart, Please try Again!");
    }
  };

const handleAddToWishlist = () => {
  try {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      toast.error("Already added to wishlist!");
      return;
    }

    wishlist.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("Success added to wishlist!");
  } catch (error) {
    toast.error("Failed add to wishlist, Please try again¸");
  }
};

  return (
    <>
    <Toaster position="top-center" />
      {isLoggedIn ? <NavbarLogin /> : <Navbar />}
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div className="md:col-span-2 space-y-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-90 object-contain rounded-lg"
          />
          <div className="flex gap-3">
            <img
              src={product.image}
              alt="thumb"
              className="w-16 h-16 border rounded-lg object-contain"
            />
            <img
              src={product.image}
              alt="thumb"
              className="w-16 h-16 border rounded-lg object-contain"
            />
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-800">{product.description}</p>
          </div>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              Sent From:{" "}
              <span className="font-semibold text-black">
                Ibu Kota Nusantara
              </span>
            </p>
            <p>
              Shipping Fee:{" "}
              <span className="font-semibold text-black">
                Rp 25.000 – Rp 34.000
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-700 mt-1">
              <img src="/icon-star.svg" className="w-4 h-4" alt="star" />
              <span className="font-semibold">4.5 | 112 Review</span>
              <span>•</span>
              <img src="/icon-heart.svg" className="w-4 h-4" alt="heart" />
              <span className="font-semibold">21rb Wishlist</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-black">
            {convertToIDR(product.price)}
          </p>

          <div className="border rounded-lg p-4 shadow space-y-4">
            <div className="text-sm space-y-2">
              <p>
                Stock: <strong>{stock}</strong>
              </p>
              <div className="flex items-center gap-2">
                <span>Quantity:</span>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={handleMinus}
                    className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={stock}
                    onChange={handleQuantityChange}
                    className="w-12 text-center border-x outline-none"
                  />
                  <button
                    onClick={handlePlus}
                    className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <p>
                Total Buy:{" "}
                <span className="text-black font-semibold">
                  {convertToIDR(product.price * (quantity || 1))}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="bg-primary hover:bg-cyan-600 text-white py-2 rounded-lg text-sm cursor-pointer">
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="border border-gray-400 hover:bg-gray-100 py-2 rounded-lg text-sm cursor-pointer"
              >
                Add to Cart
              </button>
            </div>

            <div className="flex justify-between text-xs text-gray-500 pt-2">
              <button>Chat</button>
              <button
                onClick={handleAddToWishlist}
                className="flex items-center gap-1 hover:text-gray-700 transition cursor-pointer"
              >
                <img src="/icon-heart.svg" alt="wishlist" className="w-4 h-4" />
                Wishlist
              </button>
              <button>Share</button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-800 border-t pt-4">
            <div className="flex items-center gap-2">
              <img src="/icon-seller.svg" className="w-4 h-4" alt="seller" />
              <p className="font-semibold">
                Seller:{" "}
                <span className="text-primary">Felichia Autorizhed Seller</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icon-star.svg" className="w-4 h-4" alt="star" />
              <p>
                Rating:{" "}
                <span className="font-semibold">4.81 | 6.4jt Review</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src="/icon-heart.svg" className="w-4 h-4" alt="heart" />
              <p>
                Wishlist: <span className="font-semibold">5.98jt</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
