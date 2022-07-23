import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaShoppingCart, FaSignInAlt, FaSignOutAlt,FaUser} from 'react-icons/fa'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const onLogout = () => {
    if(user){
      localStorage.removeItem('user')
      navigate('/login')
    }
    
  }
  return (
    <div className='header'>
      <div className="header-ul">
        <Link to='/'>Agencija.ba</Link>
    <ul>
      {/* <li><Link to='/login'><FaSignInAlt/> Prijavi se </Link></li>
      <li><Link to='/register'><FaUser /> Registruj se </Link></li> */}

      {user ? (
          
            <>
            <li><Link to='/cart'><FaShoppingCart/></Link></li>
            {user.role == 'admin' ? (
            <>
            <li><span>Admin</span></li>
          <li><Link to='/admin'>{user && user.name}<FaUser/></Link></li>
            
            </>): (<>
          <li><Link to='/profile'>{user && user.name}<FaUser/></Link></li>
            </>)}
          <li><button className='btn-secondary' onClick={onLogout}><FaSignOutAlt />Logout</button></li>
          </>    
          ) :
               
               (<>
               
            <li><Link to='/'><FaShoppingCart/></Link></li>
               
               <li><Link to='/login'>
                    <FaSignInAlt />Login
                </Link></li>
                <li><Link to='/register'>
                    <FaSignOutAlt />Register
                </Link></li>
               </>)}
            
    </ul>
    </div>
    </div>
  )
}

export default Header
