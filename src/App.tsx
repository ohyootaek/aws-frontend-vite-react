import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Skill from './components/Skill'
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <div className='app-container'>
        <Home />
        <Skill />
        <Routes>
          <Route path='/' />
        </Routes>
      </div>
    </Router>
  )
}

export default App
