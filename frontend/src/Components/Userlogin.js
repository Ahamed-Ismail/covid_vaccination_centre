import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Userlogin.css";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Userlogin() {
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://3.83.2.214:8000/auth/userlogin", { aadhar, password });
    const data = result.data;
    if (data.res === "ok") {
      toast.success(data.msg);
      setTimeout(() => {
        localStorage.setItem('aadhar', aadhar);
      navigate('/userhomepage');
       }, 2500);
      
    }
    else {
      toast.error(data.msg);
    }
  }

  return (
    <div>
      <form onSubmit={handleUserLogin}>
        <label>User Login</label>
        <input
          required
          placeholder="aadhar"
          type="text"
          className="aadhar"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
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

export default Userlogin;
