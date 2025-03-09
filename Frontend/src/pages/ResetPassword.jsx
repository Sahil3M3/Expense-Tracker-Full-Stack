import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    let [isLoader,setIsLoader]=useState(false);
    const navigate=useNavigate();


    const handleSubmit=async(e)=>{
        setIsLoader(ps=>!ps)
        const email=e.get("email")

        
try {
    let url=`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ${process.env.REACT_APP_FIREBASE_KEY}`
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

        setIsLoader(ps=>!ps)

    if (!response.ok) {
      throw new Error("Failed to update profile.");
    }
    

alert("If email is valid and register with us ,You will receive a link to reset the password");

setTimeout(()=>{
navigate("/login")

},800)

  } catch (error) {
    alert( error.message);
  }


    }

  return (
        <div className='auth-container'>
            <h3>Reset Password</h3>
          <form action={handleSubmit}>
            <label htmlFor='email'>Email :  </label>
            <input id='email' name='email' type='email' />
            <br/>
          
            { !isLoader ?<button>Sent Link</button> :<p>Loading...</p>}
            
          </form>
                  <Link to="/login"><button  className='auth-button'>Login</button></Link>
        </div>
  )
}

export default ResetPassword