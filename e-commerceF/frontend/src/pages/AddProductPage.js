import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProductPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = () => {

    const newProduct = {
  id: Date.now(),
  name: name.trim(),
  price: Number(price),
  category: "Electronics",
  image: "https://via.placeholder.com/150"
};

    const existingProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    existingProducts.push(newProduct);

    localStorage.setItem(
      "products",
      JSON.stringify(existingProducts)
    );

    alert("Product added successfully");

    navigate("/products");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Add Product</h2>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
}

export default AddProductPage;