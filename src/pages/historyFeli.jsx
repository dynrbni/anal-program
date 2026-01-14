import React, { useEffect, useState } from "react";
import NavbarLogin from "../component/navbarLoggedIn";

const historyFeli = () => {
  const [products, setProducts] = useState([]);
  const [historyIds, setHistoryIds] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    setHistoryIds(storedHistory);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => storedHistory.includes(item.id));
        setProducts(filtered);
      });
  }, []);

  return (
    <>
      <NavbarLogin />
      <div className="max-w-5xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">History Purchasement</h1>

        {products.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada riwayat pembelian.</p>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                <div>
                  <p className="font-bold">Order Name:</p>
                  <p>{item.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">Price:</p>
                <p className="font-bold text-primary">Rp {(item.price * 16500).toLocaleString()}</p>
                <p className="text-green-600 font-semibold mt-2">Successful</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default historyFeli;
