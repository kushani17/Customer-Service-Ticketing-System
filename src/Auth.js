import React, { useEffect, useState } from "react";
import app from "./base.js";
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  var [currentUser, setCurrentUser] = useState();
  useEffect(() => {

    app.auth().onAuthStateChanged(function(user)
    {
      if(user)
      {
        setCurrentUser(true);
      }
      else
      {
        setCurrentUser(false);
      }
    });
  }, []);
  
  return (

    <AuthContext.Provider
      value={{
        
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
