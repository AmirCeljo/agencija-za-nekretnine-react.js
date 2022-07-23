import React from 'react'
import {toast} from 'react-toastify'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

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
    <div>
      
    </div>
  )
}

export default Profile
