
import LandingPage from "./pages/landingpage"
import DetailProduct from "./pages/detailproduct";
import HomePage from "./pages/home"
import CartPage from "./pages/cartFeli";
import ProfilePage from "./pages/profileUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CheckoutPage from "./pages/checkoutPage";
import WishFeli from "./pages/wishFeli";
import HistoryFeli from "./pages/historyFeli";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<WishFeli />} />
      <Route path="/history" element={<HistoryFeli />} />
      <Route path="/product/:id" element={<DetailProduct />} />
    </Routes>
  </Router>
  )
}

export default App
