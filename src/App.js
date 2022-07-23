import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Header from './pages/Header'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Admin from './components/Admin'
import Cart from './components/Cart';
import Footer from './pages/Footer';

function App() {


    return (
    <>
        <Router>
            <Header/>
            <Routes>
                
                <Route path='/' element={<Homepage /> } /> 
                <Route path='/login' element={<Login /> } /> 
                <Route path='/register' element={<Register /> } /> 
                <Route path='/profile' element={<Profile /> } /> 
                <Route path='/admin' element={<Admin /> } /> 
                <Route path='/cart' element={<Cart /> } /> 
            </Routes>
            <Footer/>
        </Router>
        <ToastContainer />
    </>
  )
}

export default App
