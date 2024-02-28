import React, { useState } from "react";
import "./Hospitallogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Hospitallogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleHospitallogin = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://3.83.2.214:8000/auth/hospitallogin",
      { username, password }
    );
    const data = result.data;
    if (data.res === "ok") {
      toast.success(data.msg);
        setTimeout(() => {
            localStorage.setItem("username", username);
            navigate("/hospitalhomepage");
      }, 2500);
      
    } else {
      toast.error(data.msg);
    }
  };
  return (
    <div>
      <form onSubmit={handleHospitallogin}>
        <label>Hospital Login</label>

        <input
          required
          placeholder="username"
          type="text"
          className="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          required
          placeholder="password"
          type="password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={() => {}}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Hospitallogin;
