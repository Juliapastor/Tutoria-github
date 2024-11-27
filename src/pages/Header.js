import React, { useEffect, useState } from 'react';
import { supabase } from '../SupabaseService'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import img1 from './img/HeaderWebUniversae.png'
import img2 from './img/universae.png'
import './Calendario'
import { useAuth } from '../supabase/AuthProvider';


const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(0); // Estado para los tokens del usuario
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
  
    // Obtener los tokens del usuario
    useEffect(() => {
      const fetchToken = async () => {
        if (user) {
          const { data, error } = await supabase
            .from('Pagos')
            .select('token')
            .eq('email', user.email)
            .single(); // Obtener un solo registro
  
          if (error || !data) {
            console.error('Error al obtener los token:', error);
            setToken(0); // Si hay un error o no hay datos, los tokens son 0
          } else {
            setToken(data.token || 0); // Si hay datos, usar el número de tokens, o 0 si es undefined
          }
        } else {
          setToken(0); // Si no hay usuario, no tiene tokens
        }
      };
  
      fetchToken();
    }, [user]); // Ejecutar el efecto cuando el usuario cambie
  

  return (
    <div className='header'>
        <div className='img'>
            <a href='/'><img src={img1} /></a>
        </div>
        <div className='uni'>
            <img className='img2' src={img2} /><p>Tus unicodes: <span>{token}</span></p>
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