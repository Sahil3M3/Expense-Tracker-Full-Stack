import React, { useEffect, useState } from 'react';

const ExpenseTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: ""
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(ps => ({ ...ps, [id]: value }));
  };
useEffect(async()=>{
  let token=localStorage.getItem("token");
  
  try {
    const response=await fetch("http://localhost:5000/user/",{
      headers:{
        "Authorization":token
      }
    })
    const data=await response.json();
    const {name,photoUrl}=data.data;
setFormData({
  name,photoUrl
})


    
  } catch (error) {
    alert(error)
  }


},[])
  const submitHandler =async (event) => {
    event.preventDefault();
const token=localStorage.getItem("token");
    try {
      const response=await fetch("http://localhost:5000/user/",{
        method:"PATCH",
        body:JSON.stringify({name:formData.name,photoUrl:formData.photoUrl}),
        headers:{
          "Content-Type":"application/json",
          "Authorization":token
        }
      })

      const data=await response.json();
      console.log(data);
      
    } catch (error) {
      
    }

  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h2>{showForm ? "Winners never quit, Quitters never win." : "Welcome To Expense Tracker!!!"}</h2>
        <span style={{ backgroundColor: "#e7dadc", borderRadius: "20px", padding: "10px", display: "flex", alignItems: "center" }}>
          {showForm ? `Your Profile is 64% completed. A complete Profile has higher chances of landing a job.` : "Your Profile is incomplete."}
          <button
            onClick={() => setShowForm(true)}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "5px 10px",
              marginLeft: "10px",
              fontSize: "12px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Complete now
          </button>
        </span>
      </div>
      <hr />
      {showForm && (
        <form style={{ marginLeft: "300px" }} id="updateForm" onSubmit={submitHandler}>
          <h3>Contact Details</h3>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="name">Full Name</label>
            <input  minLength={5} maxLength={50} id="name" onChange={handleChange} type="text" value={formData.name} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="photoUrl">Profile Url</label>
            <input minLength={5} maxLength={100}  id="photoUrl" onChange={handleChange} type="text" value={formData.photoUrl} />
          </div>
          <button type="submit" style={{ backgroundColor: "#dc3545", color: "white", padding: "5px 10px", border: "none",maxWidth:"80px" ,cursor: "pointer", borderRadius: "5px" }}>
            Update
          </button>
        </form>
      )}
    </>
  );
};

export default ExpenseTracker;
