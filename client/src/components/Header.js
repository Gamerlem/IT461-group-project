import React, { useState, useEffect } from "react";
import "../css/Header.css";
import { CSSTransition } from "react-transition-group";
import { FcDatabase } from 'react-icons/fc';

const Header = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
        <div className="LogoContainer">
            <img src={require("../assets/logo.png")} className="Logo" alt="logo" />
            <p className="LogoText">Robots for Hire</p>
        </div>
        <CSSTransition
            in={!isSmallScreen || isNavVisible}
            timeout={300}
            classNames="NavAnimation"
            unmountOnExit
        >
            <nav className="Nav">
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contact Us</a>
                <button className="bn31"><span className="bn31span">Sign in</span></button>
            </nav>
        </CSSTransition>
        
        <button onClick={toggleNav} className="Menu">
            <FcDatabase />
        </button>
    </header>
  );
}

export default Header;