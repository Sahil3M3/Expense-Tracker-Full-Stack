import React, { useState, useEffect } from "react";

const ExpenseForm = ({ setExpenses, expenses, editingExpense, setEditingExpense, onEdit }) => {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const categories = ["Food", "Petrol", "Salary", "Entertainment", "Other"];

  useEffect(() => {
    if (editingExpense) {
      setExpense(editingExpense);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        // If editing, call the onEdit function
        await onEdit(editingExpense.id, expense);
      } else {
        // If adding a new expense
        let url = "https://e-commerce-35754-default-rtdb.firebaseio.com/expense.json";
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(expense),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to add expense");

        const data = await response.json();
        const newExpense = { id: data.name, ...expense };

        // Update the expenses list dynamically
        setExpenses([...expenses, newExpense]);
      }

      // Reset the form
      setExpense({ amount: "", description: "", category: "Food" });
      setEditingExpense(null); // Reset the editing state
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <label>
        Amount Spent:
        <input type="number" name="amount" value={expense.amount} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Description:
        <input type="text" name="description" value={expense.description} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Category:
        <select name="category" value={expense.category} onChange={handleChange}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">{editingExpense ? "Update Expense" : "Add Expense"}</button>
      {editingExpense && (
        <button type="button" onClick={() => setEditingExpense(null)} style={{ marginLeft: "10px" }}>
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;