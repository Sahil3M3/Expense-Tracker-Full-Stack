import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigation=useNavigate();
  const token=localStorage.getItem("token");

  useEffect(()=>{
   
   if(token!==null)
   {
 navigation("/expensebuddy")
   }
   
  },[navigation,token])

    const submitHandler=async (e)=>{
      const email=e.get("email")
      const password =e.get("password");
      const confirmPassword=e.get("confirmPassword")

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
                 }

                 try {
                    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
                    
                    const response = await fetch(url, {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password:password,
                            returnSecureToken: true
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
        
                    const data = await response.json();
        
                    if (!response.ok) {
                        throw new Error(data.error?.message || "Signup failed!");
                    }
        
                    alert("Signup successful!");
                    
        navigation("/login")
                } catch (error) {
                    alert(error.message);
                }
      
    }

  return (
        
    <div className='auth-container'>
        <h3>Sign Up</h3>
      <form action={submitHandler}>
        <label htmlFor='email'>Email :  </label>
        <input id='email' name='email' type='email' />
        <br/>
        <label htmlFor='password'>Password :  </label>
        <input id='password' name='password' type='password' />
         <br/>
        <label htmlFor='confirmPassword'>Confirm Password  </label>
        <input id='confirmPassword' name='confirmPassword' type='confirmPassword' />
        <button>Sign Up</button>
      </form>
        <Link to="login"><button type='none' className='auth-button'>Login</button></Link>
    </div>
    
  )
}

export default Signup