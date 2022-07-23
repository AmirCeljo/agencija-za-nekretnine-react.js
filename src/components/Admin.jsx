import React from 'react'
import {toast} from 'react-toastify'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { FaLocationArrow, FaPencilAlt, FaTrash,FaTimes } from 'react-icons/fa'
function Admin() {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [product , setProduct] = useState({
    title:'', price:'', description:'', category:'',address:'',subject:'',image:''
  })

  const [updateProd , setUpdateProduct] = useState({
    update_title:'',
    update_price:'',
    update_description:'',
    update_category:'',
    update_address:'',
    update_subject:'',
    update_image:''
  })
  const {title, price, description, category,address,subject,image} = product
  const {update_title, update_price, update_description, update_category,update_address,update_subject,update_image} = updateProd
  useEffect(()=> {
    const fetchData = async () => {
      const result = await axios.get('https://agencija-za-nekretnine-react.herokuapp.com/getProduct')
      setProducts(result.data)
    }
    fetchData();

    if(!user){
      toast.error('Molimo logujte se')
      navigate('/login')
    } 
  },[])
  const deleteProduct = async(trenutniId) => {
    const korisnik = JSON.parse(localStorage.getItem('user'))
    const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/deleteProduct', {korisnik,trenutniId})
    
    if(result){
      toast('Uspješno izbrisan artikl')
      navigate('/admin')
    }
  }

  
  const closeForm = () => {
    const over = document.querySelector('.update-overlay')
    if(!over.classList.contains('display-none')){
        over.classList.add('display-none');
    }
  }
  const toggleForm = () => {
    
    
      const over = document.querySelector('.update-overlay');
      if(over.classList.contains('display-none')){
        over.classList.remove('display-none')
      }
    
    // const korisnik = JSON.parse(localStorage.getItem('user'))
    // const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/updateProduct', {korisnik,updateItem})
    
    // if(result){
    //   toast('Uspješno izbrisan artikl')
    //   navigate('/admin')
    // }
  }

  const updateItem = async (itemId) => {
   
    const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/updateProduct',{itemId,updateProd})

    if(result){
      toast('Uspješno ste izmjenili proizvod')
      navigate('/')
    }

  }
  const onChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
    setUpdateProduct((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/addProduct', product)

    if(result){
      toast('Uspješno dodan proizvod')
      navigate('/admin')
    }

  }
  return (
    <div className='admin-container'>
      <div className='profile-background'>
        <img src="https://cdn-icons-png.flaticon.com/512/306/306473.png" alt="" />
      </div>
      
      <div className='admin-container-content'>
        <h1 className='secondary-color'>Hello {user.name} , vi ste Admin</h1>

        <form className='login-register-form' onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Naslov</label>
          <input type="text" id='title' className='form-control' name="title" value={title}
          onChange={onChange}
          placeholder="Unesite naslov"/>
        </div>
            
        <div className="form-group">
          <label htmlFor="price">Cijena</label>
          <input type="text" id="price" className='form-control'name="price" value={price}
          onChange={onChange}
          placeholder="Unesite cijenu"/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Opis</label>
          <textarea id='opis'cols='10' rows='4' className='form-control'name="description" value={description}
          onChange={onChange}
          placeholder="Unesite opis"> </textarea>
        </div>
        <div className="form-group">
        <label htmlFor="address">Adresa</label>
          <input type="text" className='form-control'name="address" value={address}
          onChange={onChange}
          placeholder="Unesite adresu"/>
        </div>
        <div className="form-group">
          <label htmlFor="category">Kategorija</label>
          <select name="category" className='form-control' id="category" onChange={onChange}>
            <option value="none">Izaberi kategoriju</option>
            <option value="kuća">Kuća</option>
            <option value="stan">Stan</option>
            <option value="vikendica">Vikendica</option>
            <option value="apartman">Apartman</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subjekat</label>
          <select name="subject" className='form-control' id="subject" onChange={onChange}>
            <option value="none">Izaberi subjekt</option>
            <option value="iznajmljivanje">Iznajmljivanje</option>
            <option value="prodaja">Prodaja</option>
           
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Slika</label>
          <input type="text" name='image' className='form-control' id='image'onChange={onChange} value={image} />
        </div>
        
        
        <button type='submit' className='btn-block'>Dodaj proizvod</button>
        
      </form>
        
      </div>

      <div className='svi-proizvodi-container'>
        <h1 className='secondary-color'>Svi proizvodi</h1>

        <div className="svi-proizvodi-container-content">
          {products.map((item)=> (
            <div className='product-card' key={item.id}> 
              <div className='product-img'>
                <img src={item.image} width="150" height="150" alt="" />
              </div>
              <div className="product-info">
                <p>{item.id}</p>
                <h4>{item.title}</h4>
                <p>Cijena {item.price} KM {item.subject =='iznajmljivanje' ? (<>mjesecno</>): (<></>)}</p>
                <p><FaLocationArrow /> {item.address}</p>
              </div>
              <div className="product-options">
                <button type='button' className='btn-delete' onClick={() => {
                  deleteProduct(item.id)
                }}><FaTrash/></button>
                <button type='button' className='btn-update' onClick={() => {
                  toggleForm()
                }}><FaPencilAlt/></button>
                
              </div>
              <div className='update-overlay display-none'>
              <div className='times' onClick={() => {
                                closeForm()
                            }}>
                           
                            <FaTimes />
                        
                        </div>
      <form className='login-register-form' onSubmit={() => {

        updateItem(item.id) 
        
        }}>
        <div className="form-group">
          <label htmlFor="update_title">Naslov : {item.title}</label>
          <input type="text" id='update_title' className='form-control' name="update_title" value={update_title}
          onChange={onChange}
          placeholder="Unesite naslov"/>
        </div>
            
        <div className="form-group">
          <label htmlFor="update_price">Cijena</label>
          <input type="text" id="update_price" className='form-control'name="update_price" value={update_price}
          onChange={onChange}
          placeholder="Unesite cijenu"/>
        </div>
        <div className="form-group">
          <label htmlFor="update_description">Opis</label>
          <textarea id='opis'cols='10' rows='4' className='form-control'name="update_description" value={update_description}
          onChange={onChange}
          placeholder="Unesite opis"> </textarea>
        </div>
        <div className="form-group">
        <label htmlFor="update_address">Adresa</label>
          <input type="text" id="update_address" className='form-control'name="update_address" value={update_address}
          onChange={onChange}
          placeholder="Unesite adresu"/>
        </div>
        <div className="form-group">
          <label htmlFor="update_category">Kategorija</label>
          <select name="update_category" className='form-control' id="update_category" onChange={onChange}>
            <option value="none">Izaberi kategoriju</option>
            <option value="kuća">Kuća</option>
            <option value="stan">Stan</option>
            <option value="vikendica">Vikendica</option>
            <option value="apartman">Apartman</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="update_subject">Subjekat</label>
          <select name="update_subject" className='form-control' id="update_subject" onChange={onChange}>
            <option value="none">Izaberi subjekt</option>
            <option value="iznajmljivanje">Iznajmljivanje</option>
            <option value="prodaja">Prodaja</option>
           
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="update_image">Slika</label>
          <input type="text" name='update_image' className='form-control' id='update_image' value={update_image} onChange={onChange} />
        </div>
        
        
        <button type='submit' className='btn-block'>Dodaj proizvod</button>
        
      </form>
        
      </div>

            </div>
          ))}
        </div>

      </div>
      
    </div>
  )
}

export default Admin
