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
    setShownBtn(true);
   }

  return (
    <>
    <div className={`expense-form-container ${isDarkMode?"form-conatiner-dark":null}`} >
   {showBtn&& <ExpenseForm showForm={setShownBtn} onCancel={setEditingExpense} editExpense={editingExpense} />}
   <button onClick={()=>setShownBtn(ps=>!ps)} className='showBtn'>{!showBtn ?"Add Expense ":"Hide " } 
            Form</button> 
         { showBtn&&( <button className='showBtn' onClick={()=>(setShownBtn(false),setEditingExpense(null))}>Cancel</button>)}

   </div>

     <div className={`expense-list-container ${isDarkMode?"darkMode-container":null}`} >
       <ExpenseList  onEdit={handleEdit}/>
    </div>
       </>
  )
} 

export default Expenses
