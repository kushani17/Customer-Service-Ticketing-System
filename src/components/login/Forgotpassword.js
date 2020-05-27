import React, { Component } from 'react';

import Card from '../UIElements/Card';
import Button from '../FormElements/Button';


import './Auth.css';


export default class test extends Component {
  render() {
      return (
        <Card style={{backgroundColor:'#32dede4a', width:1500, height: 350}} className="authentication">
          <div style={{ backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,
            paddingTop: 0.5,paddingBottom: 0.5, alignItems:'center'}}>
        <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Enter Email Address</b></h2>
        <hr />
        <form style={{backgroundColor:'#32dede4a'}}>
          
          <div>
          <input style={{width:300, marginLeft:-2}}
            id="email"
            placeholder='Enter Email'
            type="text"     
          /><br></br>
          </div>
         
          
          <Button  type="submit" >
            Send Link
          </Button>
          
        </form>
        </div>
      </Card>
      
      )
  }
}



