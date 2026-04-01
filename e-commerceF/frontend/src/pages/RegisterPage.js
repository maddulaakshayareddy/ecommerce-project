import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const nav = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const changeName = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const regSubmit = async () => {
    try {

      const res = await api.post("/register", data);

      alert(res.data);

      nav("/login");

    } catch (error) {

      console.log(error);
      alert("Registration Failed");

    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>

      <h4 className="text-center text-primary mb-3">
        Register Page
      </h4>

      <input
        name="username"
        value={data.username}
        onChange={changeName}
        placeholder="Enter Username"
        className="form-control mb-2"
      />

      <input
        name="email"
        value={data.email}
        onChange={changeName}
        placeholder="Enter Email"
        className="form-control mb-2"
      />

      <input
        type="password"
        name="password"
        value={data.password}
        onChange={changeName}
        placeholder="Enter Password"
        className="form-control mb-3"
      />

      <button
        onClick={regSubmit}
        className="btn btn-success w-100"
      >
        Register
      </button>

    </div>
  );
}

export default RegisterPage;