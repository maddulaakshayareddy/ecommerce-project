import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Products.css";

/* IMPORT IMAGES */
import shoes from "../images/shoes.jpg";
import laptop from "../images/laptop.jpg";
import phone from "../images/phone.jpg";
import watch from "../images/watch.jpg";
import smartwatch from "../images/smartwatch.jpg";
import dress from "../images/dress.jpg";

// 🔥 YOUR NEW IMAGES
import headphone from "../images/headphone.jpg";
import backpack from "../images/backpack.jpg";
import sunglasses from "../images/sunglasses.jpg";
import camera from "../images/camera.jpg";
import jacket from "../images/jacket.jpg";
import speaker from "../images/speaker.jpg";

function ViewProductsPage() {

  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortType, setSortType] = useState(""); // 🔥 NEW

  /* 🔍 SEARCH */
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search")?.toLowerCase() || "";

  // ✅ DEFAULT PRODUCTS
  const defaultProducts = [
    { id: 1, name: "Shoes", price: 2300, image: shoes, category: "Fashion" },
    { id: 2, name: "Laptop", price: 50000, image: laptop, category: "Electronics" },
    { id: 3, name: "Phone", price: 17000, image: phone, category: "Electronics" },
    { id: 4, name: "Watch", price: 2300, image: watch, category: "Accessories" },
    { id: 5, name: "Smart Watch", price: 6000, image: smartwatch, category: "Accessories" },
    { id: 6, name: "Dress", price: 3500, image: dress, category: "Fashion" },

    // 🔥 EXTRA PRODUCTS
    { id: 7, name: "Headphones", price: 2000, image: headphone, category: "Electronics" },
    { id: 8, name: "Backpack", price: 1500, image: backpack, category: "Fashion" },
    { id: 9, name: "Sunglasses", price: 1200, image: sunglasses, category: "Accessories" },
    { id: 10, name: "Speaker", price: 3000, image: speaker, category: "Electronics" },
    { id: 11, name: "Camera", price: 45000, image: camera, category: "Electronics" },
    { id: 12, name: "Jacket", price: 3000, image: jacket, category: "Fashion" }
  ];

  // ✅ LOAD LOCAL STORAGE
  const savedProducts =
    JSON.parse(localStorage.getItem("products")) || [];

  // ✅ REMOVE DUPLICATES
  const allProducts = [...defaultProducts, ...savedProducts];

  const products = allProducts.filter(
    (item, index, self) =>
      index === self.findIndex(
        p => p.name.toLowerCase() === item.name.toLowerCase()
      )
  );

  // ✅ FILTER LOGIC
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      (!search || name.includes(search) || search.includes(name)) &&
      (category === "All" || (product.category || "Electronics") === category) &&
      product.price <= maxPrice
    );
  });

  // ✅ SORTING LOGIC
  let sortedProducts = [...filteredProducts];

  if (sortType === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // ✅ ADD TO CART
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));

    setMessage("Item added to cart ✅");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="product-page">

      <h2 className="title">Products</h2>

      {message && <div className="toast">{message}</div>}

      <div className="layout">

        {/* 🎨 SIDEBAR */}
        <div className="sidebar">
          <h3>Filters</h3>

          <p><b>Category</b></p>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Accessories</option>
          </select>

          {/* 🔥 SORT DROPDOWN */}
          <p><b>Sort By</b></p>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="">None</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>

          <p><b>Showing products under ₹{maxPrice}</b></p>

          <input
            type="range"
            min="1000"
            max="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          {/* 🔥 RESET BUTTON */}
          <button onClick={() => {
            setCategory("All");
            setMaxPrice(100000);
            setSortType("");
          }}>
            Reset Filters
          </button>
        </div>

        {/* 🛍 PRODUCTS */}
        <div className="product-container">

          {sortedProducts.length === 0 && (
            <h3 style={{ width: "100%", textAlign: "center" }}>
              ❌ No products found
            </h3>
          )}

          {sortedProducts.map(product => (

            <div key={product.id} className="product-card">

              <span className="badge">HOT</span>

              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
              />

              <h3 style={{ textTransform: "capitalize" }}>
                {product.name}
              </h3>

              <p className="price">₹{product.price}</p>

              <p className="rating">⭐⭐⭐⭐☆</p>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ViewProductsPage;