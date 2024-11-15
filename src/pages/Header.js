import React from 'react'
import { supabase } from '../SupabaseService'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import img1 from './img/HeaderWebUniversae.png'
import img2 from './img/universae.png'
import './Calendario'
import { useAuth } from '../supabase/AuthProvider';


const Header = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  }
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Elimina el usuario del contexto
  };
  

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
      {user ? (
        <>
          <p>Bienvenido, {user.email}</p>
          <button style={{backgroundColor: '#134c8f', border: 'none', color:'white', fontSize:'16px'}} onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <a href='/'>Inicia Sesión</a>
      )}
      </div>
    </div>
  )
}

export default Header