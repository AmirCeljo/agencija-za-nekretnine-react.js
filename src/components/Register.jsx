import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
function Register() {
  const role = 'user'
  const navigate = useNavigate()
  const [ registerUser, setRegisterUser] = useState({
    username: '',
    email:'',
    password: '',
    
  })
  const {username,email,password} = registerUser;

  const onChange = (e) => {
    setRegisterUser((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!username || !email || !password) {
      toast.error('Molimo popunite sva polja')
    }
    const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/register', registerUser)
    
      toast('Uspješno ste se registrovali')
      navigate('/login')
    
    
  }


  return (
    <div className='login-container secondary-color'>
    <h1 ><FaSignInAlt/>Registruj se</h1>
    <small>Molimo da kreirate novi korisnički račun</small>

    <form className='login-register-form' onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" className='form-control' name="username" value={username}
        onChange={onChange}
        placeholder="Unesite Username"
        />
      </div>
      <div className="form-group">
        <input type="email" className='form-control' name="email" value={email}
        onChange={onChange}
        placeholder="Unesite Email"/>
      </div>
      <div className="form-group">
                <input type="password" className='form-control'name="password" value={password}
                onChange={onChange}
                placeholder="Unesite Password"/>
      </div>
      
      
        <button type='submit' className='btn-block'>Prijavi se</button>
      
    </form>
  </div>
  )
}

export default Register
