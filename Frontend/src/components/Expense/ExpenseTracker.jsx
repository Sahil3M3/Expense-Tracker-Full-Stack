import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

const ExpenseTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: ""
  });
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null); // State to track the expense being edited
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const url = "https://e-commerce-35754-default-rtdb.firebaseio.com/expense.json";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch expenses");
      const data = await response.json();

      let expensesArray = Object.keys(data || {}).map((key) => ({
        id: key,
        ...data[key],
      }));

      setExpenses(expensesArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchData();
  }, [navigate, token]);

  const onDelete = async (id) => {
    try {
      let url = `https://e-commerce-35754-default-rtdb.firebaseio.com/expense/${id}.json`;
      const response = await fetch(url, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(response.error.message);
      }

      fetchData();
      setExpenses(ps => ps);
    } catch (error) {
      alert(error);
    }
  };

  const onEdit = async (id, updatedExpense) => {
    try {
      let url = `https://e-commerce-35754-default-rtdb.firebaseio.com/expense/${id}.json`;
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatedExpense),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      // Update the local state
      setExpenses(prevExpenses =>
        prevExpenses.map(expense =>
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      );

      setEditingExpense(null); // Reset the editing state
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((ps) => ({ ...ps, [id]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: formData.name,
          photoUrl: formData.photoUrl,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      let url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          requestType: "VERIFY_EMAIL"
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      alert("Email Verified successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
        <h2>{showForm ? "Winners never quit, Quitters never win." : "Welcome To Expense Tracker!!!"}</h2>
        <button style={{ maxWidth: "100px" }} onClick={handleVerify}>
          Verify Email
        </button>
        <button style={{ maxWidth: "100px" }} onClick={handleLogout}>
          Log out
        </button>
        <span
          style={{
            backgroundColor: "#e7dadc",
            borderRadius: "20px",
            padding: "10px",
            display: "flex",
            alignItems: "center"
          }}
        >
          {showForm ? "Your Profile is 64% completed. A complete Profile has higher chances of landing a job." : "Your Profile is incomplete."}
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
              borderRadius: "5px"
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
            <input minLength={5} maxLength={50} id="name" onChange={handleChange} type="text" value={formData.name} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="photoUrl">Profile Url</label>
            <input minLength={5} maxLength={100} id="photoUrl" onChange={handleChange} type="text" value={formData.photoUrl} />
          </div>
          <button type="submit" style={{ backgroundColor: "#dc3545", color: "white", padding: "5px 10px", border: "none", maxWidth: "80px", cursor: "pointer", borderRadius: "5px" }}>
            Update
          </button>
        </form>
      )}
      {token && <ExpenseForm setExpenses={setExpenses} expenses={expenses} editingExpense={editingExpense} setEditingExpense={setEditingExpense} onEdit={onEdit} />}
      {token && <ExpenseList expenses={expenses} onDelete={onDelete} onEdit={(id) => setEditingExpense(expenses.find(expense => expense.id === id))} />}
    </>
  );
};

export default ExpenseTracker;