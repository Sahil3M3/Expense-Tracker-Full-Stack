import React, { useEffect } from 'react'
import user from "../images/user.svg"
import {Link,useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../store/auth';
import { activatePremium, toggleTheme } from '../store/theme';

const Header = () => {
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");
  const navigation=useNavigate();
  const isPremium=useSelector(state=>state.theme.isPremium);
  const isDarkMode=useSelector(state=>state.theme.darkMode);

const logout=async () => {
 dispatch(authAction.logout())
 dispatch(activatePremium(false));
 navigation("/login");
}
useEffect(() => {
  if (token === undefined) {
    navigation("/login");
  }
},[navigation,token]);

const toggleDarkMode = () => {
  dispatch(toggleTheme()); 
  
};


  return (
   <header className={isDarkMode?"dark":null}>
    <Link to="/expensebuddy" >
     <nav className={isDarkMode?"dark":null}>
     ExpenseBuddy 
    </nav>
    </Link>
    {isPremium && <div className="toggle-container">
        <label className="togglebtn">
          <input type="checkbox" checked={isDarkMode}  onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
        <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>}
   {token!==null && <section>
      
    <img src={user} alt='User logo' onClick={()=>navigation("expensebuddy/profile")} />
       <button className={isDarkMode?"dark":null} onClick={logout} >Logout</button>
      
    </section>}
   </header>
  )
}

export default Header
