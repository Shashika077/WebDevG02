import React, { useState } from 'react';
import axios from 'axios';
import './LogingSingup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LogingSingup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');
  const [name2, setName2] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isLogin ? 'http://localhost/Web/backend/login.php' : 'http://localhost/Web/backend/register.php';

    let data = {
      email,
      password,
      name: 'employer',
      name2
    };

    if (!isLogin) {
     
      if (!name2.trim()) {
        toast.error('Name is required for registration.');
        return;
      }
      
      // Ensure password confirmation is handled
      if (password !== password2) {
        toast.error('Passwords do not match.');
        return;
      }

      data.password2 = password2;
    }

    try { 
      const result = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const response = result.data;
      if (response.status === 'success') {
        toast.success(response.message);

        // Store the token if login
        if (isLogin && response.token) {
          localStorage.setItem('token', response.token);
        }

        setTimeout(() => {
          if (isLogin) {
            setRedirectTo('/home');
          } 
        }, 2000); 

        setTimeout(() => {
          if (!isLogin) {
            setRedirectTo('/');
          } 
        }, 5000); 

      } else {
        toast.error(response.message);
      }

    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  if (redirectTo) {
    window.location.href = redirectTo;
  }

  return (
    <div className="LogingSingup-container">
      <h1 className="singup">{isLogin ? 'Employer Login' : 'Employer Sign Up'}</h1>

      <form onSubmit={handleSubmit}>
       
          <input
            type="text"
            className="name"
            placeholder="Name"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            required
          />
        
        <input
          type="email"
          className="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="password"
            className="password2"
            placeholder="Re-Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        )}
        <p>
          {isLogin ? (
            <>
              Don't have an account? <span className="span" onClick={() => setIsLogin(false)}>Register here</span>
            </>
          ) : (
            <>
              Already have an account? <span className="span" onClick={() => setIsLogin(true)}>Login here</span>
            </>
          )}
        </p>
        <button className="button1" type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      
      <ToastContainer />
    </div>
  );
};

export default LogingSingup;
