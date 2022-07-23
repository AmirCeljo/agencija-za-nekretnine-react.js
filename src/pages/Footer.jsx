import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

function Footer() {
  return (
    <div className='footer'>
      <ul>
        <li><a href="">Ponuda</a></li>
        <li><a href="">Blog</a></li>
        <li><a href="">O nama</a></li>
        <li><a href="">Kontakt</a></li>
        <li><a href="">Prijavi se</a></li>
        <li><a href="">Registruj se</a></li>
      </ul>
      <ul>
        <li><a href=""><FaFacebook/></a></li>
        <li><a href=""><FaTwitter/></a></li>
        <li><a href=""><FaInstagram/></a></li>
        <li><a href=""><FaLinkedin/></a></li>
      </ul>
      <p>
        Copyright 2021 &copy; 2022  
      </p>
    </div>
  )
}

export default Footer
