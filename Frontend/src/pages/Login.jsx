import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { authAction } from '../store/auth';

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
    const submitHandler=async(e)=>{
        const email=e.get("email");
        const password=e.get("password");
        
        try {
          let url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
          let response=await fetch(url,{
              method:"POST",
              body:JSON.stringify({email:email,
                  password:password
              }),
              headers:{
                  "Content-Type":"application/json"
              }
          })
          let data =await response.json();
         
          
      if(!response.ok)
      {    
          throw new Error(data.error.message)
      }
      const {localId,idToken}=data
      
      
      
      await localStorage.setItem("token",idToken); 
      await localStorage.setItem("localId",localId);
      await dispatch(authAction.login({idToken,localId}))

          navigate("/expensebuddy")
      
      } catch (error) {
       alert(error)  
        
      }
        
      }

  return (
    <div className='auth-container'>
        <h3>Login</h3>
      <form action={submitHandler}>
        <label htmlFor='email'>Email :  </label>
        <input  required id='email' name='email' type='email' />
        <br/>
        <label htmlFor='password'>Password :  </label>
        <input required id='password' name='password' type='password' />
         <br/>
        <button>Login</button>
      </form>
              <Link to="/"><button  className='auth-button'>Sign Up</button></Link>
              <Link to="/resetpassword"><button  className='auth-button'>Reset Password</button></Link>
    </div>
  )
}

export default Login