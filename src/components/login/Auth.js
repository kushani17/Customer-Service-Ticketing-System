import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import Card from '../UIElements/Card';
import Button from '../FormElements/Button';

import './Auth.css';

export default class Auth extends Component {
  render() {
      return (
        <Card className="authentication">
        <h2>Login Details</h2>
        <hr />
        <form >
          <label>E-mail:</label>
          <input
            id="email"
            type="email"     
          /><br></br>
          <label>Password:</label>
          <input       
            id="password"
            type="password" 
          /><br></br>
          
          <Link to="/Updatepassword"><Button>
                LOGIN 
              </Button>
              </Link>
          <span >
           <a href="/Forgotpassword">Forgot password?</a></span>
        </form>
      </Card>
      )
  }
}

