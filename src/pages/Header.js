import React from 'react'
import { supabase } from '../SupabaseService'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import img1 from './img/HeaderWebUniversae.png'
import img2 from './img/universae.png'
import './Calendario'


const Header = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  }
  

  return (
    <div className='header'>
        <div className='img'>
            <a href='/'><img src={img1} /></a>
        </div>
        <div className='uni'>
            <img className='img2' src={img2} /><p>Tus unicodes:</p>
        </div>
        <div className='inicio'>
      <a href='/'>Inicio</a>
      <a href='calendario'>Calendario</a>
      <a href='perfil'>Perfil</a>
      <a href='tienda'>Tienda</a>
      <a href='tutorias'>Mis Tutorías</a>
      <a href='cerrarsesion'>Cerrar Sesión</a>
    
      </div>
    </div>
  )
}

export default Header
