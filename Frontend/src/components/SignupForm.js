import React, { useState } from 'react';
import "./SignupForm.css";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const submitHandler = async(event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("User registered:", formData);

try {
    let response=await fetch("http://localhost:5000/user/signup",{
        method:"POST",
        body:JSON.stringify({email:formData.email,
            password:formData.confirmPassword
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
    console.log(" Signed Up",data);
    


} catch (error) {
 alert(error)   
}

    };

    return (
        <div className="maindiv">
            <h1>Sign Up</h1>
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
                
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input 
                    type='password'  
                    id="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleChange} 
                    placeholder='Confirm your password' 
                    minLength={3} 
                    maxLength={15} 
                    required 
                />
                
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
