import React, { useEffect } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom';
import { signOut } from '../SupabaseService';
import Header from './Header';
import Login from './LoginEmail';
import './Home.css'

const Home = () => {
  
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/perfil');
  }
 

  return (
    <div className='body'>
      <Header />
      
      <Login />
      
    </div>
  )
}

export default Home