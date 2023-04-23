import React, { useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";

export default function LoginScreen() {
  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loading, setLoading]=useState(false)
    const[error, setError]=useState(false)
    const[success, setSuccess]=useState(false)    


    async function login(){
      const user={
     
        email,
        password
    }
      try {
        setLoading(true)
        const result = (await axios.post('/api/v1/auth/login',user)).data
        setLoading(false);
        localStorage.setItem('currentUser',JSON.stringify(result))
        window.location.href='/home'
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log(error);
        
      }
    }

    return (
        <div className='login'>
         <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Login
          </h2>

          {loading && (<Loader/>)} 
          {error && (<Error error='Invalid Credentials'/>)}
          {success && (<Success success='User Login Successfully'/>)}
          <div>
            <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input
              type="text"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            
            <button onClick={login} className="btn btn-success mt-3 mb-3 rounded-pill">LOGIN</button>
            <br/>
            <a style={{color:'black',textDecoration:"none"}} href="/register" className="mt-2">Click Here To Register</a>
          </div>
        </div>
      </div>
        </div>
    )
}