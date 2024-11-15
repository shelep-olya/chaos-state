import React from 'react';

import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import Test from '../components/Test/Test.jsx';
import useAuthStatus from '../hooks/useAuthStatus.js';

function TestPage() {
  const isLoggedIn = useAuthStatus();
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div style={{margin:"2rem 4rem"}}>
        <Test/>
      </div>
      <Footer/>
    </>
  )
}

export default TestPage
