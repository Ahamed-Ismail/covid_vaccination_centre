import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './userhomepage.css'

function Userhomepage() {

  const [isvaccinated, setIsvaccinated] = useState();
  const [hospitalDetails, setHospitaldetails] = useState([]);
  const [aadhar, setAadhar] = useState(localStorage.getItem('aadhar'));

  useEffect(() => {
    const fetchHospital = async () => {
      const res = await axios.get("http://localhost:8000/db/gethospital");
      const d = res.data;
      setHospitaldetails(d.datarow);
    };
    fetchHospital();
  }, []);
  
  useEffect(() => {
    const fetchIsvac = async () => {
      const res = await axios.get(`http://localhost:8000/db/vaccinated/${aadhar}`);
      const d = res.data;
      if (d.res === 'ok') {
        setIsvaccinated(d.data.vaccinated);
      }
      else {
        toast.error(d.msg);
      }
    };
    fetchIsvac();
  }, []);
  
  // useEffect(() => {
  //   console.log(isvaccinated);
  // }, [isvaccinated]);
  
  const bookappointment = async(index) => {
    try {
      const res = await axios.get(`http://localhost:8000/db/vaccinated/${aadhar}`);
      const d = res.data;

      const appointed = d.data.isappointed;

      if (appointed === '1') {
        toast.error("Already appointment made, check your registered mail!");
        return;
      }

      const data = hospitalDetails[index];
      const username = data.username;

      const res1 = await axios.post("http://localhost:8000/db/bookappointment", { aadhar, username });
      const d1 = res1.data;
      if (d1.res == "ok") {
        toast.success(d1.msg);
      }
      else {
        toast.error(d1.msg);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="userhomepage">
      {isvaccinated==='1' ? <label>Already vaccinated. You Can Vaccinate only once!</label> :
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
           {hospitalDetails.filter(details => details.vaccineCount > 0).map((details, index) => {
             return( <tr key={index}>
               <td>{details.username}</td>
               <td>{details.address}</td>
               <td>{details.district}</td>
               <td>{details.state}</td>
               <td>{details.xcord}</td>
               <td>{details.ycord}</td>
               <td>{details.vaccineCount}</td>
               <td><button className='delete-button' onClick={() => {bookappointment(index) }}>Book</button></td>
             </tr>)
           })}
         </tbody>
       </table>
     </div>}
      <ToastContainer />
    </div>
  )
}

export default Userhomepage