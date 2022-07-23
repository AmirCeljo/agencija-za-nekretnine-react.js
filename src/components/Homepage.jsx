import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import{toast} from 'react-toastify'
import { FaCircle, FaDotCircle, FaLocationArrow, FaRegDotCircle, FaStar,FaStarHalf, FaStarHalfAlt } from 'react-icons/fa'
function Homepage() {
  const [products , setProducts] = useState([])
  const navigate= useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchData = async() => {
      const result = await axios.get('https://agencija-za-nekretnine-react.herokuapp.com/getProduct')
      setProducts(result.data)
      console.log(result.data)
    }

    fetchData()
  }, [])
 
  const addToCart = async(trenutniId) => {
    const korisnik = JSON.parse(localStorage.getItem('user'))
    
    const result = await axios.post('https://agencija-za-nekretnine-react.herokuapp.com/addtocart', {korisnik,trenutniId})
    
    if(result){
      toast('Uspješno dodan artikl u košaricu')
      navigate('/cart')
    }
  }


  return (
    <div className='container'>
      <div className="landing-container">
        <div className="landing-container-content">
          <ul>
            <li><a href="">Ponuda</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">O nama</a></li>
            <li><a href="">Kontakt </a></li>
          </ul>
          <h1>Iznajmi,kupi nekretninu preko web sajta Agencija.ba</h1>
          <p>Prijavi se i rezerviši danas</p>

          <small>Pretraži pojmove</small>
          
          <form action="">
            <div className="form-group one">
              <input type="search" placeholder='Trosoban stan, Vikendica, Lijepo namještena kuća ...'/>
            </div>
            <div className="form-group two">
              <select type="select" >
                <option value="none">Izaberi kategoriju</option>
                <option value="kuća">Kuća</option>
                <option value="stan">Stan</option>
                <option value="stan">Vikendica</option>
                <option value="stan">Apartman</option>
              </select>
            </div>
            <div className="form-group two">
              <select type="select" >
                <option value="none">Izaberi subjekt</option>
                <option value="iznajmljivanje">Iznajmljivanje</option>
                <option value="prodaja">Prodaja</option>
                
              </select>
            </div>
            <div className="form-group three">
            <button type='button' className='btn-search'>Pretrazi</button>

            </div>
          </form>
        </div>
      </div>

      <div className="blog-container">
          <h1 className='secondary-color'>Blog</h1>
        <div className="blog-container-content">
          <a href="">
          <div>
            <h3>Kako uštedjeti vrijeme i izbjeći pogrešan odabir nekretnine</h3>
            <img src="https://q-xx.bstatic.com/xdata/images/hotel/840x460/222950246.jpg?k=e5762921504a3344692d36bd38e66ed17752e34e6cb045337aa117106b41c95d&o="
             alt="" />
            <p>Uštedite vrijeme prilikom odabira nekretnina koje ćete posjetiti
Nakon što ste pronašli oglas nekretnine koju bi ste htjeli pogledati, u oglasu potražite i nacrt iste kako bi ste imali uvid u
raspored prostorija.</p>
          <div className='dot-circle'>
            <FaCircle/>
            <FaCircle/>
            <FaCircle/>
          </div>
          </div>
          </a>
          <a href="">
          <div>
            <h3>Procjenitelj prema Međunarodnim Standardima Procjene</h3>
            <img src="https://www.metropolanekretnine.ba/fajlovi/2021/03/IMG-6c83672d61c0e6402a9e6ae2bce08c1a-V-835x467.jpg" alt="" />
            <p>Pored dugogodišnjeg iskustva na tržištu, uposleni u našoj agenciji su već odavno osposobljeni za samostalnu, detaljnu i kvalitetnu analizu tržišne vrijednosti nekretnina. Kako to ne bi ostalo samo na tome da procjene vršimo na osnovu iskustva (iako smatramo da bez iskustva teško ili nikako prolazi bilo kakav certifikat)</p>
            <div className='dot-circle'>
            <FaCircle/>
            <FaCircle/>
            <FaCircle/>
          </div>
          </div>
          </a>
          <a href="">


          <div>
            <h3>Novogradnja Dobrinja! Odlični stanovi za urbani način života!</h3>
            <img src="https://www.metropolanekretnine.ba/fajlovi/2019/12/DOBRINJA-useljivo-750x467.jpg" alt="" />
            <p>Obavještavamo kupce i ostale zainteresovane za kupovinu stana, da je stambeno-poslovni objekat na Dobrinji, izgrađen u ulici Braće Mulić, dobio pravosnažnu upotrebnu dozvolu i da je USELJIV. Za one koji još uvijek ne znaju, riječ je o vrlo lijepom, manjem stambeno-poslovnom objektu, projektovanom na način da izgleda kao urbana vila, čime se savršeno uklapa u lokaciju te istu znatno uljepšava.</p> 
            <div className='dot-circle'>
            <FaCircle/>
            <FaCircle/>
            <FaCircle/>
          </div>
          </div>
          </a>
        </div>
      </div>

      <div className="onama-container">
        <div className="onama-container-content">
          <h1>Upoznajte nas</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, dicta. Qui eius exercitationem aliquid non id tempore doloribus officiis perspiciatis unde illum, a commodi illo reprehenderit quisquam eligendi quibusdam dicta?</p>
        </div>
      </div>

      <div className="ponuda-container">
        <h1 className='secondary-color'>Novo u ponudi</h1>
        <div className="ponuda-container-content">
          { products.length > 0 ? (<>
            {products.map((item) => (
              <div className="ponuda-card" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <small>{item.title}</small>
                    
                  </div>
                  <div className='ponuda-card-desc'>
                    <p>{item.description}</p>
                  </div>
                  <div>
                     <p> Cijena: {item.price} KM {item.subject == 'iznajmljivanje' ? (<>mjesecno</>): (<></>)} </p>
                     <p><FaLocationArrow/> {item.address}</p>
                  </div>
                  {user ? (<button type='button' className='btn-reserve' 
                  onClick={() => {
                    addToCart(item.id)
                  }}>Add to cart </button>) : (<><Link to='/register'>Molimo prijavite se</Link></>)}
              </div>
            ))}
          
          </>) : (<h3>Nema nista u ponudi</h3>)}
        </div>
      </div>

      <div className='recenzije-container'>
      <h1 className='secondary-color'> Recenzije</h1>
      {!user ? (<>
        <div className='recenzije-opcija'>
              <h3 className='secondary-color'>Želite ostaviti recenziju a niste prijavljeni ?</h3>

              <div>
                <button type='button' className='btn-primary'>Prijavi se</button>
                <button type='button' className='btn-primary'>Registruj se</button>
              </div>
            </div>
      </>) : (<></>)}
      
        <div className="recenzije-container-content">

          
          
          <div>
            <div className='recenzije-text'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQlX8kHgCFYgNqXisB6cWENyTofgINwzUOG_u6zBbliVuY_n5EwFl0W4k1b43X9HcsII&usqp=CAU" alt="" />       
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sit commodi nesciunt vitae dolore.</p>       
            <div className="star-container">
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStarHalfAlt/>

            </div>
            </div>
            <h4>Korisnik</h4>
          </div>
          <div>
          <div className='recenzije-text'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQlX8kHgCFYgNqXisB6cWENyTofgINwzUOG_u6zBbliVuY_n5EwFl0W4k1b43X9HcsII&usqp=CAU" alt="" />  
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sit commodi nesciunt vitae dolore.</p>       
            <div className="star-container">
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStarHalfAlt/>

            </div>
            </div>
            <h4>Korisnik</h4>
          </div>
          <div>
            <div className='recenzije-text'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQlX8kHgCFYgNqXisB6cWENyTofgINwzUOG_u6zBbliVuY_n5EwFl0W4k1b43X9HcsII&usqp=CAU" alt="" />              
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sit commodi nesciunt vitae dolore.</p>       
            <div className="star-container">
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStarHalfAlt/>

            </div>
            </div>
            <h4>Korisnik</h4></div>

        </div>
      </div>


    </div>
  )
}

export default Homepage
