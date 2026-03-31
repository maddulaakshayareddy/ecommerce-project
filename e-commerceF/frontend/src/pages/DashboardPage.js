import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DashboardPage() {

  const navigate = useNavigate();

  const username = localStorage.getItem("uname");

  useEffect(() => {

    if (!username) {
      navigate("/login");
    }

  }, [navigate, username]);

  return (

    <div>

      {/* Center content */}
      <div style={{
        textAlign: "center",
        marginTop: "150px"
      }}>

        <h1>Welcome, {username}</h1>

        <br />

        <button
          onClick={() => navigate("/products")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0b2a4a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Shop Now
        </button>

      </div>

    </div>

  );

}

export default DashboardPage;