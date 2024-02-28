import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Userlogin from "./Components/Userlogin";
import Signup from "./Components/Signup";
import Adminlogin from "./Components/Adminlogin";
import Home from "./Components/Home";
import Hospitallogin from "./Components/Hospitallogin";
import Adminhomepage from "./Components/HomePages/Adminhomepage";
import Userhomepage from "./Components/HomePages/Userhomepage";
import Hospitalhomepage from "./Components/HomePages/Hospitalhomepage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hospitallogin" element={<Hospitallogin />} />
      <Route path="/userlogin" element={<Userlogin />} />
      <Route path="/adminlogin" element={<Adminlogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userhomepage" element={<Userhomepage />} />
      <Route path="/adminhomepage" element={<Adminhomepage />} />
      <Route path="/hospitalhomepage" element={<Hospitalhomepage />} />

    </Routes>
  );
}

export default App;
