import React from 'react'
import {useState, useEffect} from 'react'
import { FaLocationArrow, FaShoppingCart,FaTimes,FaTrash } from 'react-icons/fa'
import {toast} from 'react-toastify'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
function Cart() {
  const [getCart,setGetCart] = useState([])
   const navigate = useNavigate()
  useEffect(()=>{ 

    const fetchData = async () => {
        const korisnik = JSON.parse(localStorage.getItem('user'))
        const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/getusercart',korisnik)
        console.log(result.data)
        setGetCart(result.data)
    }
    fetchData()
  },[])

  const deleteFromCart  = async (trenutniId) => {
    const korisnik = JSON.parse(localStorage.getItem('user'))
    const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/deletefromcart', {korisnik,trenutniId})
    
    if(result){
        toast('Uspješno izbrisan artikl')
        navigate('/cart')
    }
  }
  const closeForm = () => {
    const popup = document.querySelector('.contact-form')
    if(!popup.classList.contains('display-none')){
        popup.classList.add('display-none');
    }
  }
  const toggleForm = () => {
    const popup = document.querySelector('.contact-form')
    if(popup.classList.contains('display-none')){
        popup.classList.remove('display-none');
    }
  }

  return (
    <div className='cart-container'>
        <div className="cart-container-heading">
        <h1 className='secondary-color'><FaShoppingCart/>Vaša Korpa</h1>
        <Link to='/' >Nastavi s kupovinom</Link>
        </div>

        <div className="cart-container-content">
            {getCart.map( (item) => (
                <div className='cart-card' key={item.id}>
                    <div className='delete-cart-card'>
                        <button type='button' className='btn-delete'
                        onClick={() => {
                            deleteFromCart(item.product_id)
                        }}><FaTrash/></button>
                    </div>
                    <div className="cart-img">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="cart-info">
                    <p>{item.product_id}</p>
                       <h3>{item.title}</h3>
                       <p>Cijena: {item.price} KM {item.subject == 'iznajmljivanje' ? (<>mjesecno</>): (<></>)}</p>
                       <p><FaLocationArrow /> {item.address}</p>
                       <p>Email: {item.email}</p>
                    </div>
                    <div className="cart-options">
                       <p>Klikom na rezerviši dobijate mogućnost da razgovarate
                        s našim operaterom putem poruke
                       </p>
                       <button type="button" className='btn-reserve' onClick={() => {
                        toggleForm();
                       }}> Rezerviši</button>
                    </div>
                    <div className="contact-form display-none">
                        <div className='times' onClick={() => {
                                closeForm()
                            }}>
                           
                            <FaTimes />
                        
                        </div>
                        <form action="">
                        <div className="contact-form-agent">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQlX8kHgCFYgNqXisB6cWENyTofgINwzUOG_u6zBbliVuY_n5EwFl0W4k1b43X9HcsII&usqp=CAU" alt="" />
                        </div>
                        
                            <h3>Artikl : {item.title}
                            </h3>
                        
                            <div className="form-group">
                                <input type="text" placeholder='Unesite naslov artikla'/>
                            </div>
                            <div className="form-group">
                                <textarea name="" id="" cols="30" rows="10"
                                placeholder='Unesite željeni text pourke'></textarea>
                            </div>
                            <div className="form-group">
                                <button type='button' className='btn-block'>Pošalji</button>
                            </div>
                            <p className='primary-color'>Naši agenti će se potruditi da Vam odgovore u što kraćem roku</p>
                        </form>
                        
                    </div>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default Cart
