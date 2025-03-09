import React from 'react'
import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ExpenseBuddy from './pages/Expense/ExpenseBuddy'
import ProfileForm from './pages/Expense/ProfileForm'
import Expenses from './pages/Expense/Expenses'
import ResetPassword from './pages/ResetPassword'


const App = () => {
 
  return (
     <>
<BrowserRouter>
    <Routes>
       <Route path='/' element={<Layout/>}> 
       <Route index element={<Signup/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/resetpassword' element={<ResetPassword/>} />
       <Route path='expensebuddy' element={<ExpenseBuddy/>} >
             <Route index element={<Expenses/>} />
            <Route path="profile" element={<ProfileForm/>} />
       </Route>
       </Route>
    </Routes>
</BrowserRouter>
     </>
  )
}

export default App
