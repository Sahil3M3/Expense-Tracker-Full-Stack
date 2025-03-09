import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import { useSelector } from 'react-redux';


const Expenses = () => {
  const [showBtn,setShownBtn]=useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const isDarkMode=useSelector(state=>state.theme.darkMode);



   const handleEdit=(expense)=>{
    setEditingExpense(expense);
   }

  return (
    <>
    <div className={`expense-form-container ${isDarkMode?"form-conatiner-dark":null}`} >
   {showBtn&& <ExpenseForm onCancel={setEditingExpense} editExpense={editingExpense} />}
   <button onClick={()=>setShownBtn(ps=>!ps)} className='showBtn'>{!showBtn ?"Show ":"Hide " } 
            Form</button> 
         <button className='showBtn' onClick={()=>setEditingExpense(null)}>Cancel</button>

   </div>

     <div className={`expense-list-container ${isDarkMode?"darkMode-container":null}`} >
       <ExpenseList onEdit={handleEdit}/>
    </div>
       </>
  )
} 

export default Expenses
