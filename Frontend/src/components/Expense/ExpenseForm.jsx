import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addExpense, updateExpense } from "../../store/expense";
import "./ExpenseForm.css";


const ExpenseForm = ({ editingExpense, setEditingExpense }) => {
  const dispatch = useDispatch();
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  useEffect(() => {
    if (editingExpense) {
      setExpense(editingExpense);
    } else {
      setExpense({ amount: "", description: "", category: "Food" });
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingExpense) {
     
      await dispatch(updateExpense(editingExpense.id, expense));
    } else {
   
      await dispatch(addExpense(expense));
    }
  
    setExpense({ amount: "", description: "", category: "Food" });
    setEditingExpense(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          required
        />
      </label>
      <label>
        Category:
        <select
          value={expense.category}
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        >
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <button type="submit">{editingExpense ? "Update Expense" : "Add Expense"}</button>
      {editingExpense && (
        <button type="button" onClick={() => setEditingExpense(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;