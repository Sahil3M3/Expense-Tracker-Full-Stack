import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../../store/expense";
import { useEffect, useState } from "react";

const ExpenseForm = ({editExpense}) => {
  const isDarkMode=useSelector(state=>state.theme.darkMode);
 
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "Food",
  });   
         
  const handleChange = (event) => {
    const { id, value } = event.target;
setExpense(ps=>({...ps,[id]:value}))

  };

useEffect(()=>{
  if(editExpense){
setExpense(editExpense);
 }
},[editExpense])

  const dispatch=useDispatch();

    
    const handleSubmit=()=>{
        
        if(!editExpense) 
        dispatch(addExpense(expense))
        else
        dispatch(updateExpense(editExpense.id,expense))

       setExpense({amount:"",description:"",category:""})

    }


  return (
        <>
     <h3>Add Expense</h3>
       <form action={handleSubmit} className={isDarkMode?"form-darkmode":null}>
        <label htmlFor='amount'>Amount</label>
        <input  onChange={handleChange}  value={expense.amount} required name='amount' id='amount' type='number' />

        <label htmlFor='description'>Description</label>
        <input  onChange={handleChange} required name='description' value={expense.description} id='description' type='text' />

        <label htmlFor='category'>Category</label>
        <select  onChange={handleChange} name='category' value={expense.category} id='category'  >
        <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
         <button>{editExpense?"Update Expense":"Add Expense"}</button>
        </form>    
              
       </>
  )
}

export default ExpenseForm
