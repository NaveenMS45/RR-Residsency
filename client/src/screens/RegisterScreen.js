import React, { useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from '../components/Success'
export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[loading, setLoading]=useState(false)
  const[error, setError]=useState(false)
  const[success, setSuccess]=useState(false) 
  async function register(){

      if(password !== confirmPassword)
      {
          alert("passwords not matched")
      }
      else{
          const user={
              name,
              email,
              password
          }
          
          try {
            setLoading(true)
            const result = await axios.post('/api/v1/auth/register',user)
            console.log(result)
            setLoading(false)
            setSuccess(true)
            setEmail('')
            setName('')
            setConfirmPassword('')
            setPassword('')
          } catch (error) {
            setError(true)
            setLoading(false)
            console.log(error);
          }
      
      }

  }

  return (
    <div className='register'>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">

          {loading && (<Loader/>)}
          {success && (<Success success='User Registered Successfully' />)}
          {error && (<Error error='Email already registered' />)}

          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <input required type="text" placeholder="name" className="form-control mt-1" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <input required type="text" placeholder="email" className="form-control mt-1" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input
              type="text"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input
              type="text"
              placeholder="confirm password"
              className="form-control mt-1"
              value={confirmPassword}
              required
              onChange={(e)=>{setConfirmPassword(e.target.value)}}
            />
            <button onClick={register} className="btn btn-primary rounded-pill mt-3 mb-3">REGISTER</button>
            <br/>
            <a style={{color:'black',textDecoration:"none"}} href="/login">Click Here To Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}