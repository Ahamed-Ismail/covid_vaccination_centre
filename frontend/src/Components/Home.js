import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <label>
        Vacination Made Easy! Your Safety is Our priority
        <br />
        Ministry Of Health
        <br /> Covid App
      </label>
      <button onClick={() => navigate("/hospitallogin")}>HospitalLogin</button>
      <button onClick={() => navigate("/userlogin")}>UserLogin</button>
      <button onClick={() => navigate("/adminlogin")}>AdminLogin</button>
      <button onClick={() => navigate("/signup")}>New User?</button>
    </div>
  );
}

export default Home;
