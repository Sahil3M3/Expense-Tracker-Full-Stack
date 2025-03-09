import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../../store/expense';

const ExpenseList = ({onEdit}) => {
  const expenses=useSelector(state=>state.expense.expenses);
  const isDarkMode=useSelector(state=>state.theme.darkMode);
 const dispatch=useDispatch();
   
      const handleDelete = (id) => {
       dispatch(deleteExpense(id));
       
      };

      
  return (
    <>
{expenses.length > 0  &&  expenses.map(expense=>(<div key={expense.id} className={`expense-item ${isDarkMode?"darkMode-list":null}`}>
  <div className={`expense-details`} >
    <span><strong>Amount:</strong> ${expense.amount}</span>
    <span><strong>Description:</strong> {expense.description}</span>
    <span><strong>Category:</strong>{expense.category}</span>
  </div>
  <div className='expense-actions'>
    <button  onClick={()=>onEdit(expense)} className='edit-button'>
      Edit
    </button>
    <button onClick={() => handleDelete(expense.id)} className='delete-button'>
      Delete
    </button>
  </div>
</div>
))   }
</>
  )
}

export default ExpenseList
