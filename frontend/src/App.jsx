import './App.css'
import React from 'react';
import Signup from './pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Home from './pages/Home'

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes> 
            <Route path='/' element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />   
            <Route path="/dashboard" element={<Dashboard />} />   
            <Route path="/send" element={<SendMoney />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
