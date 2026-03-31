import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";   // ✅ ADD THIS

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import ViewProductsPage from "./pages/ViewProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import InvoicePage from "./pages/InvoicePage";

function App() {

  const [search, setSearch] = useState("");   // ✅ GLOBAL SEARCH

  return (
    <Router>

      {/* ✅ PASS setSearch TO NAVBAR */}
      <Navbar setSearch={setSearch} />

      <Routes>

        {/* ✅ PASS search TO PAGES WHERE PRODUCTS EXIST */}
        <Route path="/" element={<HomePage search={search} />} />

        <Route path="/products" element={<ViewProductsPage search={search} />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/history" element={<OrderHistoryPage />} />
        <Route path="/invoice" element={<InvoicePage />} />

      </Routes>

    </Router>
  );
}

export default App;