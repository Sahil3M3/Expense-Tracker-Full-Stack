import React, { useState } from 'react'
import "./SignupForm.css";
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    let [email,setEmail]=useState("");
    let [isLoader,setIsLoader]=useState(false);
const navigate=useNavigate();
    const handleSubmit=async (event)=>{
        setIsLoader(true);
event.preventDefault();

try {
    let url="https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ"
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
       requestType:"PASSWORD_RESET",
       email:email
          }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error("Failed to update profile.");
    }
 setIsLoader(false);
alert("If email is valid and register with us ,You will receive a link to reset the password");
setTimeout(()=>{
navigate("/login")

},800)    
  } catch (error) {
    alert( error.message);
  }


    }
    
  return (
    <div className="maindiv">
    <h1>Reset Password</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input 
            type='email' 
            id="email" 
            value={email}
            onChange={event=>setEmail(event.target.value)} 
            placeholder='Enter your email' 
            required 
        />   
        <button type='submit'>Sent Link</button>
{isLoader && <p>Loading...</p>}
    </form>
</div>
  )
}

export default ResetPassword
