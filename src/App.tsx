import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './App.css';
import { KeepAlive, AliveScope } from 'react-activation';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
];

const App = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // 클릭 이벤트 핸들러
  const handleBodyClick = () => {
    setShowNavbar((prevShowNavbar) => !prevShowNavbar);
  };

  useEffect(() => {
    // body에 클릭 이벤트 추가
    document.body.addEventListener('click', handleBodyClick);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setShowNavbar(true);
      setScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowNavbar(false);
        setScrolling(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
      <div>
        <AliveScope>
          <Navbar className={showNavbar ? 'navbar show' : 'navbar'} />
          <Routes>
            {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={<KeepAlive>{element}</KeepAlive>} />
            ))}
          </Routes>
        </AliveScope>
      </div>
  );
};

export default App;
