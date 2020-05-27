import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import app from "./base";
import { AuthContext } from "./Auth.js";
import  { Redirect } from 'react-router-dom'
import { render } from "react-dom";


export default function Header() {

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  

/*
  const { currentUser } = useContext(AuthContext);

  var status = 'aaa';
   submit = (event) => {
    event.preventDefault();
    if (currentUser) {
        status = 'Logout';
     app.auth().signOut();
    }
    else
    {
        status = 'dddd';
        return <Redirect to='/login'  />
    }}

  
  */

 

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


  
  const { currentUser } = useContext(AuthContext);
  
 
  return (
       
    <header className="Header">
      <img src={require("./assets/logo.png")} className="Logo" alt="logo" />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          
          <a href="/createticket">Create Ticket</a>
          <a href="/viewticket">View Ticket</a>
          
          {currentUser?
          <button onClick={() => app.auth().signOut()}>Log out</button>:<a href='\Login'>Login</a>
          }
 
        </nav>
      </CSSTransition>
      
    </header>
  );
      
        





        
      
    
  }