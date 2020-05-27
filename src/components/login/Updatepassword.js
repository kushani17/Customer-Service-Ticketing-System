import React, { Component } from 'react';

import Card from '../UIElements/Card';
import Button from '../FormElements/Button';
import './Auth.css';


export default class test extends Component {
  render() {
      return (
        <Card className="authentication" style={{backgroundColor:'#32dede4a', width:1500}}>
          <div  style={{ backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 20,
            paddingTop: 0.5,paddingBottom: 0.5, alignItems:'center', height:400}}>
        <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',paddingTop:25,fontSize:32, margin: 5, textAlign:'center', marginTop:-10 }}><b>Change your password</b></h2>
        <hr />
        <form >
          <div>
          
          <input style={{width:280}}
            placeholder="Enter Current Password"
            id="crntpswd"
            type="password"     
          /></div>
          <br></br>
          <div>
          <input style={{width:280}}
            placeholder="Enter New Password"      
            id="paswd"
            type="password" 
          /></div>
          <br></br>
          <div>
          <input style={{width:280}}
            placeholder="Re-Enter New Password"     
            id="repaswd"
            type="password" 
          /></div><br></br>
          
          <Button  type="submit" style={{width: 200 }} >
          <b> Submit</b> 
          </Button>
          
        </form>
        </div>
      </Card>
      )
  }
}



