import React from 'react'
import './Nav.css';
import logo1 from '../assets/logo1.png'

function Nav() {
  return (
    <div className='navbar'>
      <h1 className='service'>COMPENSATION REQUEST PORTAL</h1>
      <img className='logo' src={logo1} alt="img" width="80"/>
    </div>
  )
}

export default Nav
