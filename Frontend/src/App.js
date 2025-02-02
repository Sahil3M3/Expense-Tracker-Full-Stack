import './App.css';
import ExpenseTracker from './components/Expense/ExpenseTracker';
import LoginForm from './components/LoginForm';
import ResetPassword from './components/ResetPassword';
import SignupForm from './components/SignupForm';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const router=createBrowserRouter([
    {path:"/signup",element:<SignupForm/>},
    {path:"/login",element:<LoginForm/>},
    {path:"/expenseTracker",element:<ExpenseTracker/>},
    {path:"/resetpassword",element:<ResetPassword/>},
    {path:"*",element:<LoginForm/>}

  ])
  return (
  <RouterProvider router={router}/>  
  );
}

export default App;

