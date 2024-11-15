import React from 'react';

import CreateTest from '../components/CreateTest/CreateTest';
import Footer from '../components/Footer/Footer.jsx';
import Header from '../components/Header/Header.jsx';
import useAuthStatus from "../hooks/useAuthStatus.js";

function CreateTestPage() {
  const isLoggedIn = useAuthStatus();
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div style={{margin:"4rem", height:"100%"}}>
        <CreateTest/>
      </div>
      <Footer/>
    </>
  )
}

export default CreateTestPage;
