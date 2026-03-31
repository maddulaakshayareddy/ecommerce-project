import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {

  const navigate = useNavigate();

  useEffect(() => {

    const user = localStorage.getItem("uname");

    if (user) {
      navigate("/dashboard");
    }

  }, [navigate]);

  return (

    <div style={{ textAlign: "center", marginTop: "120px" }}>

      <h1>Welcome to E-Commerce Store 🛒</h1>

      <p>Buy products easily with our simple shopping system.</p>

      <br/>

      <button
        onClick={() => navigate("/login")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0b2a4a",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
          cursor: "pointer"
        }}
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Register
      </button>

    </div>

  );
}

export default HomePage;