import React, { Component } from 'react'
import Button from './components/FormElements/Button';
import {Redirect, Link} from 'react-router-dom';


export default class  extends Component {
    render() {
        return (
            <div>
            
            <h2>Thank you for your feedback!</h2>

            <hr />
            <Link to="/"><Button>
                Return Home 
              </Button>
              </Link>
           
         
            </div>
        )
    }
}
