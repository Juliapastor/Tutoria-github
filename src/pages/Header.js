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
    navigate('/'); // Redirige al usuario al inicio
  };

  const handleProtectedNavigation = (path) => {
    if (!user) {
      alert('Por favor, inicia sesión para acceder a esta página.');
      navigate('/'); // Redirige a Home
    } else {
      navigate(path); // Navega a la ruta protegida
    }
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
          <a onClick={() => handleProtectedNavigation('/calendario')}>Calendario</a>
          <a onClick={() => handleProtectedNavigation('/perfil')}>Perfil</a>
          <a onClick={() => handleProtectedNavigation('/tienda')}>Tienda</a>
          <a onClick={() => handleProtectedNavigation('/tutorias')}>Mis Tutorías</a>
      {user ? (
        <>
          <p style={{color:'white'}}>Bienvenido, {user.email}</p>
          <button href='/' style={{backgroundColor: '#134c8f', border: 'none', color:'white', fontSize:'16px'}} onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <a href='/'onClick={handleButtonClick}>Inicia Sesión</a>
      )}
      </div>
    </div>
  )
}

export default Header