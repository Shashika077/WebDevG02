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
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isLogin ? 'http://localhost/Web/backend/login.php' : 'http://localhost/Web/backend/register.php';
    
    let data = {
      email,
      password,
      name: 'admin' 
    };

    if (!isLogin) {
      // For registration, add the secret key if it's valid
      if (secretKey === '1234') {
        data.secretKey = secretKey;
      } else if (secretKey !== '') {
        toast.error('Invalid secret key. Admin account creation failed.');
        return;
      }
      
      // Ensure password confirmation is handled
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
        setRedirectTo('/dashboard'); // Redirect to dashboard on success
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
      <h1 className="singup">{isLogin ? 'Admin Login' : 'Admin Sign Up'}</h1>

      <form onSubmit={handleSubmit}>
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
          <>
            <input
              type="password"
              className="password2"
              placeholder="Re-Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <input
              type="password"
              className="secret-key"
              placeholder="Enter Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
            />
          </>
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
