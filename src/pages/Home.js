import React, { useEffect } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom';
import { signOut } from '../SupabaseService';

const Home = () => {
  
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/perfil');
  }
 

  return (
    <div>Home
      <button onClick={handleButtonClick}>Mi perfil</button>

      <button onClick={signOut}>
        Salir
      </button>
    </div>
  )
}

export default Home