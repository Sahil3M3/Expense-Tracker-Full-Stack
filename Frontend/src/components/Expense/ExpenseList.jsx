import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense } from "../../store/expense";

const ExpenseList = ({ onEdit }) => {
  const dispatch=useDispatch();

const expense=useSelector(state=>state.expense)


  const expenses=expense.expenses;

const onDelete=(id)=>{
  dispatch(deleteExpense(id))

} 
  
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "10px", borderBottom: "2px solid #ccc" }}>Amount 💰</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ccc" }}>Description 📝</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ccc" }}>Category 📂</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ccc", textAlign: "center" }}>Actions ⚙️</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px" }}>{expense.amount}</td>
                <td style={{ padding: "10px" }}>{expense.description}</td>
                <td style={{ padding: "10px" }}>{expense.category}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <button
                    onClick={() => onEdit(expense.id)}
                    style={{ marginRight: "8px", padding: "5px 10px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    style={{ marginTop: "5px", padding: "5px 10px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
