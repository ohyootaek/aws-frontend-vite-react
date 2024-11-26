import { Link } from 'react-router-dom'
import './styles/Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/login', label: 'Login' },
  { path: '/webrtc', label: 'Web-RTC' },
]

const Navbar = ({ className }) => {
  return (
    <nav className={`navbar ${className || ''}`}>
      {navLinks.map(({ path, label }, index) => {
        return <Link key={index} to={path}>{label}</Link>
      })}
    </nav>
  )
}

export default Navbar
