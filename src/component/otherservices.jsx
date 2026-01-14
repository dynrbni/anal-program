import React from "react";
import Maskapai from "../assets/maskapai.svg"
import Epdam from "../assets/epdam.svg"

const OtherServices = () => {
  return (
    <section className="px-24 py-10 ">
      <h2 className="text-xl font-bold mb-6">Other Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
          <h3 className="font-bold text-2xl mb-4">Buy Electricy Tokens<br />and pay PDAM Here</h3>
          <div className="flex items-center justify-center gap-6 mt-2">
            <img src={Epdam} alt="EPDAM" className="h-40" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h3 className="font-bold text-lg mb-4">Buy Airline Tickets</h3>
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-full flex items-center gap-2 border rounded-2xl px-4 py-2">
              ✈️ <span>Jakarta (CGK)</span>
            </div>
            <div className="w-full flex items-center gap-2 border rounded-2xl px-4 py-2">
              ✈️ <span>Tokyo (HND)</span>
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <div className="w-full flex items-center gap-2 border rounded-2xl px-4 py-2">
              📅 <span>05 May</span>
            </div>
            <div className="w-full flex items-center gap-2 border rounded-2xl px-4 py-2">
              📅 <span>07 May</span>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-2xl font-semibold">
            Search Ticket
          </button>
          <div className="flex flex-wrap justify-center gap-4 items-center mt-6">
            <img src={Maskapai} alt="Flight" className="h-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
