import React from 'react'
import { supabase } from '../SupabaseService'
import { useNavigate } from 'react-router-dom';
import './Perfil.css'
import Header from './Header';


const Perfil = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/');
  }
  

  return (
    <div>
      <Header />
      
    </div>
  )
}

export default Perfil