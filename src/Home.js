import React,{role, useContext} from "react";
import app from "./base";
import { AuthContext } from "./Auth.js";
import { Redirect } from "react-router";


const Home = () => {

  const { currentUser } = useContext(AuthContext);

  if (currentUser!=null?!currentUser:false) {
  
   
    return <Redirect to="/login"/>;
  }

  return (
    <>
   
    </>
  );
};

export default Home;
