import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './App.css';

const App: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // 클릭으로 Navbar 표시 상태를 토글하는 함수
  const handleClick = () => {
    setShowNavbar((prevShowNavbar) => !prevShowNavbar); // 상태 반전
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setShowNavbar(true);
      setScrolling(true);

      // 스크롤 멈춤 감지 후 1초가 지나면 Navbar 숨김
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowNavbar(false);
        setScrolling(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, []);

  return (
      <Router>
        <div onClick={handleClick}>
          <Navbar className={showNavbar ? "navbar show" : "navbar"} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
