import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  // 🔐 LOGIN + CART CHECK
  useEffect(() => {

    const user = localStorage.getItem("uname");

    if (!user) {
      alert("Please login first ❗");
      navigate("/login");
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

  }, [navigate]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {

    // 🚫 EMPTY CART CHECK
    if (cart.length === 0) {
      alert("Your cart is empty ❌");
      return;
    }

    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter valid email");
      return;
    }

    if (address === "" || city === "" || stateName === "") {
      alert("Fill complete address");
      return;
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincodeRegex.test(pincode)) {
      alert("Pincode must be 6 digits");
      return;
    }

    if (paymentMethod === "card") {
      if (cardNumber === "" || cardName === "" || expiry === "" || cvv === "") {
        alert("Please fill card details");
        return;
      }
    }

    if (paymentMethod === "upi") {
      if (upiId === "") {
        alert("Enter UPI ID");
        return;
      }
    }

    // ⭐ Confirm order
    const confirmOrder = window.confirm("Are you sure you want to place this order?");
    if (!confirmOrder) return;

    const newOrder = {
      name,
      phone,
      email,
      address: address + ", " + city + ", " + stateName + " - " + pincode,
      items: cart,
      total,
      paymentMethod,
      date: new Date().toLocaleString(),
      status: "Order Placed"
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(existingOrders));
    localStorage.removeItem("cart");

    alert("Order placed successfully!");

    navigate("/orders");   // ✅ better than window.location
  };

  return (

    <div
      style={{
        width: "600px",
        margin: "50px auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2 style={{ textAlign: "center" }}>Checkout</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
      />

      <h3>Shipping Address</h3>

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="text"
        placeholder="State"
        value={stateName}
        onChange={(e) => setStateName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
      />

      <h3>Payment Method</h3>

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      >
        <option value="cod">Cash on Delivery</option>
        <option value="upi">UPI</option>
        <option value="card">Credit / Debit Card</option>
        <option value="netbanking">Net Banking</option>
        <option value="wallet">Wallet</option>
      </select>

      {paymentMethod === "card" && (
        <>
          <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px" }} />
          <input type="text" placeholder="Name on Card" value={cardName} onChange={(e) => setCardName(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px" }} />
          <input type="text" placeholder="Expiry Date (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} style={{ width: "100%", marginBottom: "10px", padding: "10px" }} />
          <input type="password" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} style={{ width: "100%", marginBottom: "20px", padding: "10px" }} />
        </>
      )}

      {paymentMethod === "upi" && (
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
        />
      )}

      <h3>Order Summary</h3>

      {cart.map((item) => (
        <p key={item.id}>
          {item.name} - ₹{item.price} × {item.quantity}
        </p>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#0b2a4a",
          color: "white",
          border: "none",
          marginTop: "20px",
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Place Order
      </button>

    </div>
  );
}

export default CheckoutPage;