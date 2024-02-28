import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './adminhomepage.css';

function Adminhomepage() {
  const [hospitalDetails, setHospitaldetails] = useState([]);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [district, setDistrict] = useState();
  const [state, setState] = useState();
  const [xcord, setXcord] = useState();
  const [ycord, setYcord] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await axios.get("http://localhost:8000/db/gethospital");
      const d = res.data;
      setHospitaldetails(d.datarow);
    };
    fetchHospital();
  },[]);


  const deletehospital = async (index) => {
    try {
      console.log(index);
      const uname = hospitalDetails[index].username;
      console.log(uname);
      const del = await axios.delete(`http://localhost:8000/db/deletehospital/${uname}`);
      const r = del.data;
      if (r.res === "ok") {
        toast.success(r.msg);
        const res = await axios.get("http://localhost:8000/db/gethospital");
        const d = res.data;
        setHospitaldetails(d.datarow);
        navigate('/adminhomepage');
      }
      else {
        toast.error(r.msg);
      }
    } catch (err) { console.log(err); }
  }

  const addhospital = async () => {
    try {
      const add = await axios.post("http://localhost:8000/db/addhospital", { username, password, xcord, ycord, address, district, state });
      const r = add.data;
      if (r.res === 'ok') {
        toast.success(r.msg);
        const res = await axios.get("http://localhost:8000/db/gethospital");
        const d = res.data;
        setHospitaldetails(d.datarow);
      }
      else {
        toast.error(r.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="adminhomepage">
      <div className="table">
        <table>
          <thead>
            <tr>
              <td>Username</td>
              <td>Address</td>
              <td>District</td>
              <td>State</td>
              <td>xcord</td>
              <td>ycord</td>
              <td>VaccineCount</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {hospitalDetails.map((details, index) => {
              return( <tr key={index}>
                <td>{details.username}</td>
                <td>{details.address}</td>
                <td>{details.district}</td>
                <td>{details.state}</td>
                <td>{details.xcord}</td>
                <td>{details.ycord}</td>
                <td>{details.vaccineCount}</td>
                <td><button className='delete-button' onClick={()=>deletehospital(index)}>Delete</button></td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
      <div className="addhospital">
        <label>Add Hospital</label>
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="text" placeholder="district" value={district} onChange={(e) => setDistrict(e.target.value)} required />
        <input type="text" placeholder="state" value={state} onChange={(e) => setState(e.target.value)} required />
        <input type="text" placeholder="xcord" value={xcord} onChange={(e) => setXcord(e.target.value)} required />
        <input type="text" placeholder="ycord" value={ycord} onChange={(e) => setYcord(e.target.value)} required />
        <button onClick={()=>addhospital()}>Add Hospital</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Adminhomepage;
