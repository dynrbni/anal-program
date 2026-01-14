import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS75CfkhlVCYrfLgwDbfW5UDctuXpVgFCjqGA&s",
    "https://down-id.img.susercontent.com/id-11134141-7r98y-lxul9yf8uw7e0a",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs3St9D75Acy7j4tnKvZ5dz1uuc6IE9lrRag&s",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 17000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-5 px-24 mb-3">
      <div className="relative h-[300px] overflow-hidden rounded-xl shadow-lg">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/ hover:text-white p-3 rounded-full transition cursor-pointer"
        >
          &lt;
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/ hover:text-white p-3 rounded-full transition cursor-pointer"
        >
          &gt;
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full bg-white cursor-pointer transition-all ${
                currentIndex === index ? "scale-125 bg-opacity-75" : "bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
