import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import closeBtn from "../assets/close.svg";
import hidePass from "../assets/hide pass.svg";
import Facebook from "../assets/facebook.svg";
import Google from "../assets/google.svg";
import Vk from "../assets/vk logo.svg";
import QRcode from "../assets/qrcode.svg";

export default function LoginFeli({ isOpen, onClose, onSwitch, onLoginSuccess }) {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // email atau username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Enter your username/email and password!",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) =>
        (user.email === identifier || user.username === identifier) &&
        user.password === password
    );

    if (!matchedUser) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect username/email or password!",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Login Success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      onLoginSuccess(matchedUser);
      setIdentifier("");
      setPassword("");
      onClose();
      navigate("/home");
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          <img src={closeBtn} alt="Close" className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
        <p className="text-gray-500 text-center mb-6">
          Use your registered email or username and password to log in.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email address or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-2.5"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={hidePass} alt="Toggle" className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button onClick={onSwitch} className="text-blue-600 hover:underline cursor-pointer">
              Register
            </button>
          </p>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-center space-x-4 items-center">
          <button className="bg-primary text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2 cursor-pointer">
            <img src={QRcode} alt="QR" className="w-5 h-5" />
            <span>Scan QR</span>
          </button>
          <img src={Google} alt="Google" className="w-6 h-6 cursor-pointer" />
          <img src={Facebook} alt="Facebook" className="w-6 h-6 cursor-pointer" />
          <img src={Vk} alt="VK" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
