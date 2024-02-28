import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [aadhar, setAadhar] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [bloodg, setBloodg] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(typeof dob, dob);
      const result = await axios.post("http://3.83.2.214:8000/auth/signup", {
        aadhar,
        name,
        password,
        phoneno,
        bloodg,
        dob,
        email,
        gender,
      });
      const d = result.data;
      console.log(d);
      if (d.res === "ok") {
        toast.success(d.msg);
        setTimeout(() => {
          navigate("/userlogin");
        }, 2500);
      } else {
        toast.error(d.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <label>User Signup</label>

        <input
          required
          placeholder="Aadhar"
          type="text"
          className="aadhar"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
        />

        <input
          required
          placeholder="Full Name"
          type="text"
          className="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          required
          placeholder="Password"
          type="password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          required
          placeholder="Phone No"
          type="text"
          className="phoneno"
          value={phoneno}
          onChange={(e) => setPhoneno(e.target.value)}
        />

        <input
          required
          placeholder="Email"
          type="email"
          className="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="dob">Date of Birth</label>
        <input
          required
          type="date"
          id="dob"
          className="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <label>
          <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            value="Other"
            checked={gender === "Other"}
            onChange={(e) => setGender(e.target.value)}
          />
          Other
        </label>

        <label for="bloodg">Blood Group</label>
        <select
          required
          id="bloodg"
          className="bloodg"
          value={bloodg}
          onChange={(e) => setBloodg(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <button type="submit">Signup</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
