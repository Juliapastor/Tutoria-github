import React from 'react'
import { supabase } from '../supabase/client'

const Home = () => {

  return (
    <div>Home

      <button onClick={() => supabase.auth.signOut()}>
        Salir
      </button>
    </div>
  )
}

export default Home