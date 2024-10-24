import React from 'react'
import { supabase } from '../SupabaseService'
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  }
  

  return (
    <div>Perfil
      <button onClick={handleButtonClick}>Inicio</button>
    </div>
  )
}

export default Perfil