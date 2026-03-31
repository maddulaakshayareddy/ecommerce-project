import { Link } from "react-router-dom";

function OrdersPage() {

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders[orders.length - 1]; // latest order

  if (!order) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Your Order</h2>
        <p>No recent order.</p>

        <Link to="/">
          <button style={{ marginRight: "10px" }}>Go Home</button>
        </Link>

        <Link to="/products">
          <button>Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (

    <div style={{ textAlign: "center", marginTop: "80px" }}>

      <h2>Your Order</h2>

      <p><b>Name:</b> {order.name}</p>
      <p><b>Phone:</b> {order.phone}</p>
      <p><b>Email:</b> {order.email}</p>
      <p><b>Address:</b> {order.address}</p>

      <p><b>Order Date:</b> {order.date}</p>

      <p><b>Status:</b> {order.status}</p>

      {/* Order Tracking Progress */}

      <div style={{ marginTop: "40px", width: "60%", marginLeft: "auto", marginRight: "auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#28a745",
              color: "white",
              lineHeight: "30px"
            }}>✓</div>
            <p>Order Placed</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              color: "white",
              lineHeight: "30px"
            }}>.</div>
            <p>Shipped</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#ffc107",
              color: "white",
              lineHeight: "30px"
            }}>•</div>
            <p>Out for Delivery</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              color: "white",
              lineHeight: "30px"
            }}>•</div>
            <p>Delivered</p>
          </div>

        </div>

      </div>

      {/* Items */}

      <h3 style={{ marginTop: "40px" }}>Items</h3>

      {order.items.map((item, index) => (
        <div key={index}>
          {item.name} - ₹{item.price} × {item.quantity}
        </div>
      ))}

      <h3>Total: ₹{order.total}</h3>

      <br />

      <Link to="/">
        <button style={{ marginRight: "10px" }}>Go Home</button>
      </Link>

      <Link to="/products">
        <button>Continue Shopping</button>
      </Link>

      <Link to="/invoice">
        <button style={{ marginRight: "10px" }}>View Invoice</button>
      </Link>

    </div>

  );
}

export default OrdersPage;