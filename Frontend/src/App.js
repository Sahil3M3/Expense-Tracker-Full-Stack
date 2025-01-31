import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const router=createBrowserRouter([
    {path:"/signup",element:<SignupForm/>},
    {path:"/login",element:<LoginForm/>},
    {path:"/expenseTracker",element:<ExpenseTracker/>}

  ])
  return (
  <RouterProvider router={router}/>  
  );
}

export default App;

