import React from "react";

const Footer = () => {
  return (
<footer className="bg-gray-800 mt-20">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                  <img src="/logoganigga.svg" className="h-8 me-3 mb-4" alt="FlowBite Logo" />
              </a>
              <p className="text-white">FX Sudirman Mall, F4, Jl. Jenderal Sudirman No.1,<br />
            RT.1/RW.3, Gelora, Kecamatan Tanah Abang,<br />
            Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta<br />
            10270</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">seller</h2>
                  <ul className="text-gray-500 dark:text-white font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Product</a>
                      </li >
                      <li className="mb-4"> 
                          <a href="#" className="hover:underline">Rating Sales</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Performences</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Delivery</h2>
                  <ul className="text-gray-500 dark:text-white font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Track Package</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Delivery Company</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Content Courier</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold uppercase dark:text-white">Affiliate</h2>
                  <ul className="text-gray-500 dark:text-white font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline ">Profile Sharing</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Promotion</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Affiliate Center</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Contact us</h2>
                  <ul className="text-gray-500 dark:text-white font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Customer Service</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Email &amp; Fax</a>
                      </li>
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Help</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
</footer>
  );
};

export default Footer;
