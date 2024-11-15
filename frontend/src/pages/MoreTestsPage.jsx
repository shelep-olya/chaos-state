import React from 'react';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import MoreTests from '../components/MoreTests/MoreTests';
import useAuthStatus from '../hooks/useAuthStatus';

function MoreTestsPage() {
  const isLoggedIn = useAuthStatus();

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div style={{margin:"2rem 4rem"}}>
        <MoreTests/>
      </div>
      <Footer/>
    </>
  )
}

export default MoreTestsPage
