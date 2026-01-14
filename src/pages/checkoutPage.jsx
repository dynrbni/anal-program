import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "../component/navbarLoggedIn";
import { toast, Toaster } from "react-hot-toast";
import _ from "lodash";

const CheckoutPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rate, setRate] = useState(16500);
  const [sellerNotes, setSellerNotes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setSelectedItems(selected);

    const savedNotes = JSON.parse(localStorage.getItem("sellerNotes")) || {};
    setSellerNotes(savedNotes);

    fetch("https://api.exchangerate.host/latest?base=USD&symbols=IDR")
      .then((res) => res.json())
      .then((data) => {
        if (data.rates?.IDR) setRate(data.rates.IDR);
      });
  }, []);

  const convertToIDR = (usd) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(usd * rate);

  const formatIDR = (idr) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(idr);

  const groupedBySeller = _.groupBy(selectedItems, "seller");

  const shippingCost = 25000;
  const insurance = 14000;
  const adminFee = 1000;

  const productTotalUSD = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const productTotalIDR = productTotalUSD * rate;

  const grandTotal = productTotalIDR + shippingCost + insurance + adminFee;

  const handleNoteChange = (seller, value) => {
    setSellerNotes((prev) => {
      const updated = { ...prev, [seller]: value };
      localStorage.setItem("sellerNotes", JSON.stringify(updated));
      return updated;
    });
  };

  const handleBuy = () => {
    if (selectedItems.length === 0) {
      toast.error("Tidak ada produk yang dipilih!");
      return;
    }



    const allCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = allCart.filter(
      (item) => !selectedItems.some((sel) => sel.id === item.id)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const newHistory = selectedItems.map(item => item.id);
    localStorage.setItem("purchaseHistory", JSON.stringify([...history, ...newHistory]));

    localStorage.removeItem("checkoutItems");
    localStorage.setItem("sellerNotes", JSON.stringify(sellerNotes));
    toast.success("Pembelian berhasil (simulasi)");

    setTimeout(() => {
    navigate("/home");  
    }, 2000);
    
      
  };

  return (
    <>
     
      <NavbarLogin />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <div className="flex items-center justify-between p-4 rounded-2xl shadow border border-gray-200">
            <div className="flex items-start space-x-3">
              <img src="/location.png" alt="Location" className="w-6 h-6 mt-1" />
              <div>
                <p className="text-sm font-bold">Rumahnya Dean</p>
                <p className="text-sm text-gray-500">
                  Jl Giring Giring 2, 174, Depok City, West Java, 6287762520773
                </p>
              </div>
            </div>
            <img src="/next.png" alt="Next" className="w-4 h-4" />
          </div>

          <div className="rounded-xl p-4 shadow mt-6">
            <h3 className="font-semibold mb-2">Product</h3>

            {selectedItems.length === 0 ? (
              <p className="text-gray-500 italic">Tidak ada item terpilih.</p>
            ) : (
              Object.entries(groupedBySeller).map(([seller, items]) => (
                <div key={seller} className="mb-6 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src="/icon-seller.svg"
                      className="w-4 h-4"
                      alt="Seller Icon"
                    />
                    <p className="font-semibold text-sm">
                      Seller: <span className="text-primary">Felichia Autorizhed Seller</span>
                    </p>
                  </div>

                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center py-3 ${
                        idx !== items.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm">
                            {item.quantity} x {convertToIDR(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        {convertToIDR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}

                  <div className="mt-4">
                    <label
                      htmlFor={`note-${seller}`}
                      className="block text-sm font-semibold mb-1"
                    >
                      Note:
                    </label>
                    <textarea
                      id={`note-${seller}`}
                      value={sellerNotes[seller] || ""}
                      onChange={(e) => handleNoteChange(seller, e.target.value)}
                      placeholder="Note for this seller..."
                      className="w-full border rounded-md p-2 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-2 border-primary rounded-xl p-6 shadow-md text-sm sticky top-28 max-h-[80vh] overflow-y-auto mt-12">
          <h3 className="font-bold text-2xl mb-6">Payment Method</h3>
          <div className="space-y-4">
            {[
              { bank: "BCA", label: "BCA Virtual Account", img: "/bca.png" },
              { bank: "Mandiri", label: "Mandiri Virtual Account", img: "/mandiri.png" },
              { bank: "BRI", label: "BRI Virtual Account", img: "/bri.png" },
              { bank: "BNI", label: "BNI Virtual Account", img: "/bni.png" },
            ].map((item, index) => (
              <label
                key={item.bank}
                className="flex items-start gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="payment"
                  className="mt-1 accent-primary"
                  defaultChecked={index === 0}
                />
                <div>
                  <div className="flex items-center gap-2 font-bold">
                    <img src={item.img} alt={item.bank} className="w-10 h-auto" />
                    {item.label}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Easy and Auto Verification
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="text-sm mt-8 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Product Amount</span>
              <span>{convertToIDR(productTotalUSD)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost</span>
              <span>{formatIDR(shippingCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance</span>
              <span>{formatIDR(insurance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Admin Fee</span>
              <span>{formatIDR(adminFee)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatIDR(grandTotal)}</span>
            </div>
          </div>

          <button
            onClick={handleBuy}
            className="block w-full mt-8 bg-primary rounded-xl py-3 text-white font-bold text-lg"
          >
            Buy
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;