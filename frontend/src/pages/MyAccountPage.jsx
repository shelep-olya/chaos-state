import React from 'react';

import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import Me from "../components/Me/Me.jsx";
import useAuthStatus from '../hooks/useAuthStatus.js';

function MyAccountPage() {
  const isLoggedIn = useAuthStatus();
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div style={{margin:"2rem 4rem"}}>
        <Me/>
      </div>
      <Footer/>
    </>
  )
}

export default MyAccountPage
