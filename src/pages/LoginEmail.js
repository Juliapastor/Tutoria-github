import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail } from '../SupabaseService';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useAuth } from '../supabase/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {

    <div>
      <Header />
    </div>
    
    e.preventDefault();
    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        setSuccess('Usuario logueado correctamente.');
        setError(null);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      Forgot Password? <Link to={"/passwordreset"}>Click Here</Link>
    </div>
  );
};

export default Login;
