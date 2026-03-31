import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const user = localStorage.getItem("uname");

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate(`/products?search=${search}`);
  };

  const logout = () => {
    localStorage.removeItem("uname");
    navigate("/");
  };

  return (
    <div className="navbar">

      <h2 className="logo">🛍 Akshaya Store</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      <div className="nav-right">
        <Link to="/">🏠 Home</Link>
        <Link to="/cart">🛒 Cart</Link>
        <Link to="/orders">📦 Orders</Link>
        <Link to="/history">📜 History</Link>

        {!user ? (
          <>
            <Link to="/login" className="btn-outline">Login</Link>
            <Link to="/register" className="btn-fill">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="user">👤 {user}</span>
            <button onClick={logout} className="btn-fill">Logout</button>
          </>
        )}
      </div>

    </div>
  );
}

export default Navbar;