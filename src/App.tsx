// App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import './App.css';
import { KeepAlive } from 'react-activation';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
];
const App = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  // 클릭 이벤트 핸들러
  const handleBodyClick = () => {
    setShowNavbar((prevShowNavbar) => !prevShowNavbar);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setShowNavbar(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowNavbar(false);
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
        <Navbar className={showNavbar ? 'navbar show' : 'navbar'} />
        <Routes>
          {routes.map(({ path, element }) => (
              <Route
                  key={path}
                  path={path}
                  element={<KeepAlive id={path}>{element}</KeepAlive>}
              />
          ))}
        </Routes>
      </div>
  );
};

export default App;
