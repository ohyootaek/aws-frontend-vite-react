import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Navbar.css'

const Navbar = ({ className }) => {
  return (
    <nav className={`navbar ${className || ''}`}>
      <Link to='/'>
        Home
      </Link>
      <Link to='/login'>
        Login
      </Link>
    </nav>
  )
}

export default Navbar
