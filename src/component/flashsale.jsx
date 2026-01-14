import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Flashsale = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(15);
  const [rate, setRate] = useState(16500);
  const [timeLeft, setTimeLeft] = useState(9 * 60 * 60); // 9 jam dalam detik

  // Hitung kurs
  useEffect(() => {
    fetch("https://api.exchangerate.host/latest?base=USD&symbols=IDR")
      .then((res) => res.json())
      .then((data) => setRate(data.rates.IDR))
      .catch(() => console.log("Gagal fetch kurs, pakai default 16500"));
  }, []);

  // Fetch produk
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Gagal fetch:", err));
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fungsi konversi timer
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // Konversi USD ke IDR
  const convertToIDR = (usd) => {
    return `Rp ${Math.floor(usd * rate).toLocaleString("id-ID")}`;
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 space-y-10">
      <div className="flex items-center gap-3 mt-2">
        <h2 className="font-bold text-xl">Flash Sale Product</h2>
        <span className="text-red-600 font-semibold text-lg">
          {formatTime(timeLeft)}
            </span>
        </div>


      <div className="grid grid-cols-15 gap-4">
        {products.slice(0, visible).map((product, idx) => (
          <div
            key={idx}
            className="col-span-3 bg-white shadow rounded p-3 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="h-32 w-full object-contain"
              />
              <h3 className="font-medium mt-2 text-sm line-clamp-2">{product.title}</h3>
              <p className="font-bold text-black text-sm mt-1">
                {convertToIDR(product.price)}
              </p>
              <div className="text-xs text-gray-500 mt-2 space-y-1">
                <div className="flex items-center gap-1">
                  <img src="/icon-seller.svg" alt="seller" className="h-4 w-4" />
                  <span className="font-semibold text-gray-500">Felichia Official</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/icon-star.svg" alt="rating" className="h-4 w-4" />
                  <span className="font-semibold text-gray-700">4.5 | 112 Reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/icon-heart.svg" alt="wish" className="h-4 w-4" />
                  <span className="font-semibold text-gray-700">21k Wish</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashsale;
