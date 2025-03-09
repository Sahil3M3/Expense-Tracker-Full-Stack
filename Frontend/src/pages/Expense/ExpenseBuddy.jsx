import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { fetchExpenses } from '../../store/expense';

const ExpenseBuddy = () => {

  const navigation=useNavigate();
  
  const token=localStorage.getItem("token");
  useEffect(()=>{
   
   if(!token)
   {
 navigation("/login")
   }
  },[navigation,token])

  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(fetchExpenses());

  
},[dispatch])

  return (
    <div>
      <Outlet/>
    </div>

  )
}

export default ExpenseBuddy