import React, { useCallback, useContext } from "react";
import { withRouter } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import Card from './components/UIElements/Card';
import Button from './components/FormElements/Button';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        confirmAlert({
          title: 'Error',
          message: 'Incorrect username or password',
          buttons: [         
            {
              label: 'OK'
            }
          ]
        })
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    //return <Redirect to="/" />;
    //console.log(app.auth().currentUser);
  }

  return (
    <div>
      <Card className="authentication">
        <h2 style={{color:'#233492', fontFamily:'Times New Roman', margin: 5, fontWeight:'bold' }}>Login</h2>
        <hr/>
        
      <form onSubmit={handleLogin}>
        <div>
        <label  style={{width:300}}>
          Email
          <input className="form-control" name="email" type="email" placeholder="Email" />
        </label>
        </div>
        <div>
        <label  style={{width:300}}>
          Password
          <input className="form-control" name="password" type="password" placeholder="Password" />
        </label>
        </div>
        <div>
        <Button type="submit" className="button">Login</Button>

      
        <div style={{ marginLeft:190, marginBottom: 10}}>
          <div style = {{marginTop: 4, fontSize: 15}}>
           <a href="/Reset">Forgot password</a></div></div></div>

           <div style={{ marginLeft:40}}>
          <div style = {{fontSize: 15}}>
           
           <a href="/createticketanonymous">Create ticket as guest</a>&nbsp;/&nbsp;
           <a href="/searchticketstatus">View ticket status</a>
           </div>
           </div>
      </form>
      </Card>
    </div>

  );
};

export default withRouter(Login);
