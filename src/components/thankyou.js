import React, { Component } from 'react';
import Button from './components/FormElements/Button';
import {Redirect, Link} from 'react-router-dom';
import  "./thankyou.css";

export default class  extends Component {
    render() {
        return (
           
            
            <div class ="container" >
            
            <h2>Thank you for your feedback!</h2>
            <span class ="emoji">&#128522;</span>
            <hr />
            <Link to="/"><Button class ="x" >
                Return Home 
              </Button>
              </Link>
            
           
         
            </div>
        )
    }
}
