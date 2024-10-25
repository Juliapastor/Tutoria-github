import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginEmail'
import Perfil from './pages/Perfil'
import SignUp from './pages/SignUp';
import { supabase } from './supabase/client';
import NoExiste from './pages/NoExiste';
import Calendario from './pages/Calendario';

function App() {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)})
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<NoExiste/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/calendario' element={<Calendario/>}/>
      </Routes>

    </div>
  );
}

export default App;
