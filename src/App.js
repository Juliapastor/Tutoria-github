import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/LoginGithub'

import { supabase } from './supabase/client';

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session)=> {
      if (!session) {
        navigate('/login')
      } else{
        navigate('/')
      }
    })
  })
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

    </div>
  );
}

export default App;
