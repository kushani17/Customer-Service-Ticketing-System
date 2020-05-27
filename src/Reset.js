import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import Button from "./components/FormElements/Button.js";
import Card from "./components/UIElements/Card.js";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      try {
      await  app
          .auth()
          .sendPasswordResetEmail(email.value);
          confirmAlert({
            title: 'Success',
            message: 'Reset link sent',
            buttons: [         
              {
                label: 'Ok', onClick: () => { window.location = '/login'}
              }
            ]
          })
      } catch (error) {
        
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
        <Card className="authentication">
        <h2 style={{color:'#233492', fontFamily:'Times New Roman', margin: 5, fontWeight:'bold' }}>Enter Email Address</h2>
        <hr />

      <form onSubmit={handleLogin}>
        <div>
        <label style={{width:300}}>
          Email
          <input className="form-control" name="email" type="email" placeholder="Email" />
        </label>
        </div>
       <div>
         
        <Button type="submit">Send Link</Button>
        </div>
      </form>
      </Card>
    </div>
  );
};

export default withRouter(Login);
