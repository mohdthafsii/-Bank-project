import React from 'react'
import Nav from './component/Nav'
import { Outlet } from 'react-router-dom'
import Footer from './component/Footer'
function Layout() {
  return (
    <div>
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
