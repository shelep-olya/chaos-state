import React from "react";

import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import Main from "../components/Main/Main.jsx";
import useAuthStatus from "../hooks/useAuthStatus.js";

function HomePage() {
  const isLoggedIn = useAuthStatus();

  return (
    <div>
      <Header isLoggedIn={isLoggedIn}/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default HomePage
