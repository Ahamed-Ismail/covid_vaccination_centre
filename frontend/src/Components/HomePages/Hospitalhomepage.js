import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './userhomepage.css'


function Hospitalhomepage() {
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [vaccineCount, setvaccineCount] = useState(0);

  useEffect(() => {
    const fetchAppointment = async () => {
      console.log(username);
      const res = await axios.post("http://localhost:8000/db/getappointment", {username});
      const d = res.data;
      setAppointmentDetails(d.datarow);
      console.log(d.datarow)
    };
    fetchAppointment();
  }, []);

  useEffect(() => {
    const fetchvaccount = async () => {
      console.log(username);
      const res = await axios.post("http://localhost:8000/db/getvaccinecount", {username});
      const d = res.data;
      setvaccineCount(d.data[0].vaccineCount);
    };
    fetchvaccount();
  }, []);

  const confirmvaccine = async (index)=>{
    const row = appointmentDetails[index];
    const uname = row.username;
    const aadhar = row.aadhar;

    const res = await axios.post("http://localhost:8000/db/confirmvaccine", { uname, aadhar });
    const d = res.data;
    if (d.res === "ok") {
      toast.success(d.msg);
    }
    else {
      toast.error(d.msg);
    }
  }

  const deletevaccine = async (index)=>{
    const row = appointmentDetails[index];
    const uname = row.username;
    const aadhar = row.aadhar;

    const res = await axios.post("http://localhost:8000/db/deletevaccine", { uname, aadhar });
    const d = res.data;
    if (d.res === "ok") {
      toast.success(d.msg);
    }
    else {
      toast.error(d.msg);
    }
  }

  const updatecount = async () => {
    console.log(vaccineCount);
    const res = await axios.post("http://localhost:8000/db/updatecount", { username, vaccineCount });
    const d = res.data;
    console.log(d);
    if (d.res === "ok") {
      toast.success(d.msg);
    }
    else {
      toast.error(d.msg);
    }
    
  }

  return (
    <div className='hospitalhomepage'>
      <div className="table">
       <table>
         <thead>
           <tr>
             <td>Username</td>
             <td>Aadhar</td>
             <td>Name</td>
             <td>Gender</td>
             <td></td>
             <td></td>
           </tr>
         </thead>
         <tbody>
           {appointmentDetails.map((details, index) => {
             return( <tr key={index}>
               <td>{details.username}</td>
               <td>{details.aadhar}</td>
               <td>{details.name}</td>
               <td>{details.gender}</td>
               <td><button className='delete-button' onClick={() => {confirmvaccine(index) }}>Done</button></td>
               <td><button className='delete-button' onClick={() => {deletevaccine(index) }}>Delete</button></td>
             </tr>)
           })}
         </tbody>
        </table>
      </div>
      <div className="updatecount">
        <label>New Vaccine Count</label>
        <input type="number" value={vaccineCount} onChange={(e) => setvaccineCount(e.target.value)} />
        <button onClick={()=>updatecount()}>Update Count</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Hospitalhomepage