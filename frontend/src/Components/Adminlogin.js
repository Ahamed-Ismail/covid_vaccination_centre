import React, {useState} from 'react';
import './Adminlogin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Adminlogin() {

    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleAdminlogin = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://3.83.2.214:8000/auth/adminlogin", { username, password });
    const data = result.data;
    if (data.res === "ok") {
      console.log('OK');
      toast.success(data.msg);
      setTimeout(() => {navigate('/adminhomepage'); localStorage.setItem('username', 'admin') }, 2500);
      
    }
    else {
      console.log('NO');
      toast.error(data.msg);
    }
  }
  return (
    <div>
      <form onSubmit={handleAdminlogin}>
        <label>Admin Login</label>
      
            
            <input required placeholder='username' type="text" id="username" value={username}  onChange={(e)=>setUsername(e.target.value)}/>
        
      
            
            <input required placeholder="password" type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              
              <button type="submit" >Login</button>
              
      </form>
      <ToastContainer />
      
</div>
  )
}

export default Adminlogin