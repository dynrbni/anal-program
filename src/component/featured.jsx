import React from "react";
import Iphone from "../assets/featured/iphone.svg"
import smartTV from "../assets/featured/tv.svg"
import Headphones from "../assets/featured/headphones.svg"
import Laptop from "../assets/featured/laptop.svg"
import Shoes from "../assets/featured/shoes.svg"
import Tshirt from "../assets/featured/tshirt.svg"

const FeaturedProduct = () => {
    return(
        <div className="p-8 px-25">
        <h2 className="text-xl font-bold mb-4">Featured Product</h2>
      
        <div className="grid grid-cols-11 gap-4 auto-rows-[200px] ">

          <div className="bg-blue-600 col-span-3 row-span-2 rounded-xl text-white p-4 flex flex-col justify-between transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div>
              <p className="font-bold text-xl">Apple</p>
              <p className="font-bold text-3xl">iPhone 16 Pro Max</p>
            </div>
            <img src={Iphone} className="h-60 mt-4 mb-[-16px] self-center" />
          </div>
          <div className="bg-green-500 col-span-5 col-start-4 rounded-xl text-white p-4 flex items-center justify-between transition-transform duration-300 hover:scale-105 cursor-pointer">
            <p className="font-bold text-2xl">Android Smart TV</p>
            <img src={smartTV}className="h-50 mr-[-16px]" />
          </div>
          <div className="bg-red-500 col-span-3 col-start-9 rounded-xl text-white p-4 flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img src={Tshirt} className="h-30 mb-2" />
            <p className="font-semibold text-xl">T-Shirt</p>
          </div>
          <div className="bg-sky-400 col-span-2 col-start-4 rounded-xl text-white p-4 flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img src={Headphones} className="w-20 mb-2" />
            <p className="font-semibold mt-4">Headphones</p>
          </div>
          <div className="bg-yellow-400 col-span-2 rounded-xl text-white p-4 flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img src={Laptop} className="h-50" />
            <p className="font-semibold mx-[-20px]">Laptop</p>
          </div>
          <div className="bg-pink-400 col-span-4 rounded-xl text-white p-4 flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105 cursor-pointer">
            <img src={Shoes} className="h-50 mb-2" />
            <p className="font-semibold text-lg mt-[-20px]">Shoes</p>
          </div>
        </div>
      </div>
      
    )
  }
  
  export default FeaturedProduct;