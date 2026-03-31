import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ width: "70%", margin: "80px auto" }}>

      <h2 style={{ textAlign: "center" }}>Your Cart</h2>

      {cart.length === 0 ? (

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p>Cart is empty</p>

          <button
            onClick={() => navigate("/products")}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "#0b1e3c",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Go to Products
          </button>

        </div>

      ) : (

        <div>

          {cart.map(item => (

            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "10px",
                justifyContent: "space-between"
              }}
            >

              <img
                src={item.image}
                alt={item.name}
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />

              <div style={{ flex: 1, marginLeft: "20px" }}>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Total: ₹{item.price * item.quantity}</p>

                <button onClick={() => decreaseQuantity(item.id)}>-</button>

                <span style={{ margin: "0 10px" }}>
                  {item.quantity}
                </span>

                <button onClick={() => increaseQuantity(item.id)}>+</button>

              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>

            </div>

          ))}

          <h3 style={{ textAlign: "right" }}>Total: ₹{total}</h3>

          <div style={{ textAlign: "right" }}>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                padding: "10px 20px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Proceed to Checkout
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default CartPage;