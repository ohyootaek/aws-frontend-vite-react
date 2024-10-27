// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

interface NavbarProps {
  className?: string;
}
const onScrollTop = () => {
  // 페이지 최상단으로 이동
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // 스크롤 활성화
  document.body.style.overflow = 'auto';
};

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
      <nav className={`navbar ${className || ''}`}>
        <Link to="/" onClick={onScrollTop}>Home</Link>
        <Link to="/login" onClick={onScrollTop}>Login</Link>
      </nav>
  );
};

export default Navbar;
