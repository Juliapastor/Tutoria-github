import React from 'react'
import { useState } from 'react'
import { supabase } from '../supabase/client';


function Login() {
    const login = async() => {
        await supabase.auth.signInWithOAuth({
          provider: "github"
        })
      }
    
  return (
    <div>
         <button onClick={login}>Inicia sesión con Github</button>
    </div>
  )
}

export default Login