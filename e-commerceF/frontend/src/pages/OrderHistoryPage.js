import { Link } from "react-router-dom";

function OrderHistoryPage() {

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Order History</h2>

      {/* ✅ Handle empty */}
      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>

          <p><b>Name:</b> {order.name}</p>
          <p><b>Phone:</b> {order.phone}</p>
          <p><b>Email:</b> {order.email}</p>
          <p><b>Address:</b> {order.address}</p>

          <p><b>Order Date:</b> {order.date}</p>

          <h4>Items</h4>

          {/* ✅ SAFE MAP */}
          {order.items?.map((item, i) => (
            <div key={i}>
              {item.name} - ₹{item.price} × {item.quantity}
            </div>
          ))}

          <p><b>Total:</b> ₹{order.total}</p>

          <hr/>

        </div>
      ))}

      <Link to="/">
        <button>Go Home</button>
      </Link>

    </div>
  );
}

export default OrderHistoryPage;