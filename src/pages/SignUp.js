import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../SupabaseService';
import Header from './Header';

const SignUp = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/login');}
  const [formData,setFormData] = useState({
    fullName:'',email:'',password:''
  })

  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }

    })

  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('Registrado correctamente')
      navigate('/home');

      
    } catch (error) {
      alert(error)
    }
  }




  return (
    
    
      
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='Fullname'
          name='fullName'
          onChange={handleChange}
        />

        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input 
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>


      </form>
      <button onClick={handleButtonClick}>Inicia sesión</button>
    </div>
  )
}

export default SignUp