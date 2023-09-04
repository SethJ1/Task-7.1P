// src/routes/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserDocFromAuth, signInWithGooglePopup } from '../Utils/firebase';
import { auth } from '../Utils/firebase';
import '../components/Login.css';
import Input from '../components/Input';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to the home page upon successful login
      navigate('/home'); // Redirect to the homepage
    } catch (error) {
      // Handle authentication failure
      setError('Invalid email or password');
      console.error('Login failed', error);
    }
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <div className='header-div'>
        <h1>Login</h1>
          <div>
            <Input
              type='email'
              id='email'
              name='email'
              placeholder ='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <div>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder ='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <button onClick={handleSubmit}>Login</button>
          <br></br>
        {error && <p className='error-message'>{error}</p>}
        <button onClick={logGoogleUser}>Sign in with Google</button>
        <br></br>
        <p>Don't have an account? <Link to='/create-account'>Create Account</Link></p>
    </div>
  );
};

export default Login;
