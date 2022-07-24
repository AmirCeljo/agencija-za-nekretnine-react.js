import React from 'react'
import {toast} from 'react-toastify'
import { useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaArrowLeft, FaFacebook, FaInstagram, FaLinkedin, FaShoppingCart, FaTwitter } from 'react-icons/fa'

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  useEffect(()=> {
    if(!user){
      toast.error('Molimo logujte se')
      navigate('/login')
    } 
  },[])
  return (
    <div className='profile-container'>
      <div className='profile-background'>
        <img src="https://cdn-icons-png.flaticon.com/512/306/306473.png" alt="" />
      </div>

      <div className='profile-text'> 
        <h1 className='secondary-color'> Dobrodošli {user.name} </h1>
        <ul>
          <li><FaFacebook /></li>
          <li><FaInstagram /></li>
          <li><FaTwitter/></li>
          <li><FaLinkedin /></li>
        </ul>

        <ul>
          <li><h3><Link to='/'>Idi na kupovinu</Link></h3></li>
          <li><h3><Link to='/cart'><FaShoppingCart /> Vaša košarica </Link></h3></li>
        </ul>
      </div>
    </div>
  )
}

export default Profile
