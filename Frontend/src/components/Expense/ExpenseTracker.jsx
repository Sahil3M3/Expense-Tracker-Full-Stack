import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";
import { fetchExpenses } from "../../store/expense";
import "./ExpenseTracker.css";
import { toggleTheme, activatePremium } from "../../store/theme";

const ExpenseTracker = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
  });

  const darkMode = useSelector((state) => state.theme.darkMode);
  const isPremium = useSelector((state) => state.theme.isPremium);
  const expenses = useSelector((state) => state.expense.expenses);
  const totalAmount = useSelector((state) => state.expense.totalAmount);

  const [editingExpense, setEditingExpense] = useState(null);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      dispatch(fetchExpenses(auth.userId, auth.token));
    } else {
      navigate("/signup");
    }
  }, [auth.token, auth.userId, auth.isAuthenticated, dispatch, navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(authAction.logout());
      navigate("/login");
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((ps) => ({ ...ps, [id]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = auth.token;

    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: formData.name,
          photoUrl: formData.photoUrl,
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
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    try {
      const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsEamOrnVTzcU5nxbwa3RyWQAzI2_yHmQ";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: auth.token,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to verify email.");
      }

      alert("Email verification sent successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePremium = () => {
    dispatch(activatePremium());
    dispatch(toggleTheme());
  };

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + expenses.map(expense => `${expense.category},${expense.amount},${expense.description}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className={`navDiv ${darkMode ? "dark" : ""}`}>
        <section className="navContent">
          <h2>
            {showForm
              ? "Winners never quit, Quitters never win."
              : "Welcome To Expense Tracker!!!"}
          </h2>

          <div className="buttonGroup">
            {totalAmount >= 10000 && !isPremium ? (
              <button className="navButton" onClick={handlePremium}>
                Activate Premium
              </button>
            ) : null}
            {isPremium && (
              <>
                <button className="navButton" onClick={() => dispatch(toggleTheme())}>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button className="navButton" onClick={handleDownload}>
                  Download Expenses
                </button>
              </>
            )}
            <button className="navButton" onClick={handleVerify}>
              Verify Email
            </button>
            <button className="navButton logout" onClick={handleLogout}>
              Log out
            </button>
          </div>

          <span className="profileStatus">
            {showForm ? (
              <>
                Your Profile is 64% completed. A complete Profile has higher
                chances of landing a job.
              </>
            ) : (
              "Your Profile is incomplete."
            )}
            <button className="completeProfileBtn" onClick={() => setShowForm((ps) => !ps)}>
              Complete now
            </button>
          </span>
        </section>
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
      {auth.token && <ExpenseForm editingExpense={editingExpense} setEditingExpense={setEditingExpense} />}
      {auth.token && <ExpenseList onEdit={(id) => setEditingExpense(expenses.find((expense) => expense.id === id))} />}
    </>
  );
};

export default ExpenseTracker;