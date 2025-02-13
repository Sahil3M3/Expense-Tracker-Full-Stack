import React from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExpenseTracker from './components/Expense/ExpenseTracker';
import LoginForm from './components/LoginForm';
import ResetPassword from './components/ResetPassword';
import SignupForm from './components/SignupForm';
import './App.css';

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const router = createBrowserRouter([
    { path: '/signup', element: <SignupForm /> },
    { path: '/login', element: <LoginForm /> },
    { path: '/expenseTracker', element: <ExpenseTracker /> },
    { path: '/resetpassword', element: <ResetPassword /> },
    { path: '*', element: <LoginForm /> },
  ]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;