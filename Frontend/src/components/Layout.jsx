import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useSelector } from 'react-redux'

const Layout = () => {
  const isDark=useSelector(state=>state.theme.darkMode)
  return (
    <div className="wrapper">
    <Header />
    <main className={`content ${isDark?"dark":null}`} >
      <Outlet />
    </main>
    <Footer />

  </div>
  )
}

export default Layout