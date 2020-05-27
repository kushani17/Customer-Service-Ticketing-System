import React, { Component } from 'react'
import Button from './components/FormElements/Button';
import {Redirect, Link} from 'react-router-dom';
import "./thankyou.css";

export default class  extends Component {
    render() {
        var script = document.createElement("script");

    script.src = "//https://kit.fontawesome.com/a076d05399.jembed.js";
    script.async = true;

    document.body.appendChild(script);
        return (
            <div class="container">
           
            <h2 >Issue has been created!</h2>
            


            <hr />
            <Link to="/"><Button >
            Return Home
          </Button>
          </Link>
          

         
           
         
            </div>
        )
    }
}
