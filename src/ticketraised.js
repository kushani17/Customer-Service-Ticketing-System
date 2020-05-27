import React, { Component } from 'react'
import Button from '../shared/components/FormElements/Button';
import {Redirect, Link} from 'react-router-dom';

export default class ticketraised extends Component {
    render() {
        return (
            <div>
            <h2>Your ticket has been raised successfully!</h2>

            <hr />
            <Link to="/client"><Button>
                Return Home 
              </Button>
              </Link>
           
         
            </div> 
           
        )
    }
}
