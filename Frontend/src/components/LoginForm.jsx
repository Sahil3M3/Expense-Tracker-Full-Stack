import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
const LoginForm = () => {
 const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
const navigate=useNavigate();
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const submitHandler = async(event) => {
        event.preventDefault();

try {
    let url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ"
    let response=await fetch(url,{
        method:"POST",
        body:JSON.stringify({email:formData.email,
            password:formData.password
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data =await response.json();
if(response.status===409)
{
    throw new Error(data.error)
}
console.log(data.idToken);

     localStorage.setItem("token",data.idToken);
    navigate("/expenseTracker")

} catch (error) {
 alert(error)   
}

    };

    return (
        <div className="maindiv">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor='email'>Email</label>
                <input 
                    type='email' 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange} 
                    placeholder='Enter your email' 
                    required 
                />
                
                <label htmlFor='password'>Password</label>
                <input 
                    type='password'  
                    id="password"
                    value={formData.password}
                    onChange={handleChange} 
                    placeholder='Enter your password' 
                    minLength={3} 
                    maxLength={15} 
                    required 
                />
                
                
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default LoginForm
