import React from 'react';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Register from '../components/RegisterForm/Register.jsx';
import useAuthStatus from '../hooks/useAuthStatus.js';


function RegisterPage() {
  const isLoggedIn = useAuthStatus();
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div style={{margin:"2rem 4rem"}}><Register/></div>
      
      <Footer/>
    </>
  )
}

export default RegisterPage
