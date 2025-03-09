import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ProfileForm = () => {
    const token=localStorage.getItem("token") ;
    const [userData,setUserData]=useState({name:"",photoUrl:"",emailVerified:false})
   const isDark=useSelector(state=>state.theme.darkMode)
     
   console.log(isDark);
   
    useEffect(()=>{
      
      const fetchData=async () => {
          
          try {
              const response =await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ",{
                  method:"POST",
                  body:JSON.stringify({
                   idToken: token,
                  }),
                  headers:{
                   "Content-Type": "application/json",
                   Authorization: token,
                  } 
               });
  
  
               if (!response.ok) {
                  throw new Error("Failed to update profile.");
                }
  
                const data=await response.json();
                
                const {displayName,photoUrl,emailVerified}=data.users[0];
              setUserData({name:displayName,photoUrl,emailVerified})
                
  
          } catch (error) {
          alert("Error updating profile: " + error.message);            
          }
  
      }
        fetchData()
    },[token])

    const submitHandler=async (e) => {
        const name=e.get("name");
        const photoUrl=e.get("photoUrl");
        
    try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: photoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to update profile.");
        }

        
        alert("Profile updated successfully!");
      } catch (error) {
        alert("Error updating profile: " + error.message);
      }
        
        
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
    setUserData(ps=>({...ps,[id]:value}))
      };
 
      const handleVerify = async (event) => {
        event.preventDefault();
    
        try {
          const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_KEY}`;
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              idToken: token,
              requestType: "VERIFY_EMAIL",
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to verify email.");
          }
    // setUserData(ps=>({...ps,emailVerified:true}))
          alert("Email verification sent successfully!");
        } catch (error) {
          alert(error.message);
        }
      };

  return (
    <div className={`profile-form-container ${isDark?"darkMode-profile":null}`}>

      <form action={submitHandler}>
        <label htmlFor='name' >Full Name :  </label>
        <input onChange={handleChange} id='name' name='name' type='name' defaultValue={userData.name}/>
        <br/>
        <label htmlFor='photoUrl'>Photo Url :  </label>
        <input onChange={handleChange} id='photoUrl' name='photoUrl' type='photoUrl' defaultValue={userData.photoUrl} />
         <br/>
        <button>Update</button>
        {
          userData.emailVerified ?<div className='btn-email'>Email is Verified</div>:<button style={{marginTop:"10px"}} onClick={handleVerify}>Verify Email</button>
        }
      </form>
    </div>
  )
}

export default ProfileForm