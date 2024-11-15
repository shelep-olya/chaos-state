import React  from 'react';

import Footer from '../components/Footer/Footer.jsx';
import Header from '../components/Header/Header.jsx';
import Result from '../components/Result/Result.jsx';
import useAuthStatus from '../hooks/useAuthStatus.js';

function ResultPage() {
  const isLoggedIn = useAuthStatus();

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <div style={{margin:"2rem 4rem"}}>
        <Result/>
      </div>
      <Footer />
    </>
  )
}

export default ResultPage
