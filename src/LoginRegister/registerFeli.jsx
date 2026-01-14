import React, { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import closeBtn from "../assets/close.svg";
import hidePass from "../assets/hide pass.svg";
import Facebook from "../assets/facebook.svg";
import Google from "../assets/google.svg";
import Vk from "../assets/vk logo.svg";

export default function RegisterFeli({ isOpen, onClose, onSwitch, onRegisterSuccess }) {
  if (!isOpen) return null;

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Enter all fields!",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords must match!",
      });
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      Swal.fire({
        icon: "info",
        title: "Email Exists",
        text: "Email has been registered, please login.",
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      username,
      email,
      phone,
      password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
      icon: "success",
      title: "Register Success",
      text: "Account successfully created! Please login.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      onRegisterSuccess(newUser);
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer">
          <img src={closeBtn} alt="Close" className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-bold text-center mb-2">Register</h2>
        <p className="text-gray-500 text-center mb-6">
          Use your name, email, password and phone number to register a Felichia account.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <div className="flex text-sm text-gray-500">
            <p className="text-sm text-center">
              Already have an account?{" "}
              <button onClick={onSwitch} className="text-blue-600 hover:underline cursor-pointer">
                Login
              </button>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-center space-x-4 items-center">
          <img src={Google} alt="Google" className="w-6 h-6 cursor-pointer" />
          <img src={Facebook} alt="Facebook" className="w-6 h-6 cursor-pointer" />
          <img src={Vk} alt="VK" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
