import React, { useState } from "react";

const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const categories = ["Food", "Petrol", "Salary", "Entertainment", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Data:", expense);
    setExpense({ amount: "", description: "", category: "Food" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <label>
        Amount Spent:
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleChange}
          required
        />
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
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
