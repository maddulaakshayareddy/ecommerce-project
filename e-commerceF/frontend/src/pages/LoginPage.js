import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LoginPage() {

  const nav = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const change = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    try {

      const res = await api.post("/login", data);

      if (res.data) {

        alert("Login Successful");

        localStorage.setItem("uname", data.username);

        nav("/dashboard");

        window.location.reload();   // refresh navbar

      } else {

        alert("Invalid Username or Password");

      }

    } catch (error) {

      console.log(error);
      alert("Login Failed");

    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <input
          name="username"
          value={data.username}
          onChange={change}
          placeholder="Enter Username"
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={change}
          placeholder="Enter Password"
        />

        <button onClick={submit}>
          Login
        </button>

      </div>

    </div>
  );
}

export default LoginPage;