import React from 'react';

import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import useAuthStatus from '../hooks/useAuthStatus.js';

function NotFoundPage() {
  const isLoggedIn = useAuthStatus();
  
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div><h1>404 - Page Not Found</h1></div>
      <Footer/>
    </>
  )
}

export default NotFoundPage;
