import React, { useState } from "react";
import LoginFeli from "./loginFeli";
import RegisterFeli from "./registerFeli";

export default function AuthModalManager() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      <button onClick={openLogin} className="px-4 py-2 bg-blue-500 text-white rounded-md">Login</button>
      <button onClick={openRegister} className="px-4 py-2 bg-gray-500 text-white rounded-md">Register</button>

      <LoginFeli
        isOpen={isLoginOpen}
        onClose={closeModals}
        onSwitch={openRegister}
      />
      <RegisterFeli
        isOpen={isRegisterOpen}
        onClose={closeModals}
        onSwitch={openLogin}
      />
    </>
  );
}
