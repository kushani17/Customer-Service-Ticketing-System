import React, { useCallback, useContext } from "react";
import { withRouter } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import Card from './components/UIElements/Card';
import Button from './components/FormElements/Button';
import {Redirect, Link} from 'react-router-dom';
import './Style.css';

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
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    //return <Redirect to="/" />;
    console.log(app.auth().currentUser);
  }

  return (
    <Card className="authentication" style={{backgroundColor:'#32dede4a',  padding:'!important0' }}>
    <div >
     
        <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Create a New Ticket</b></h2>
        <hr/>
        
      <form >
        <div className="form-group" style={{}}>
        <label  style={{ marginLeft:-280}}>
         <b>Name</b></label>
          <input style={{width:320, marginLeft:20}}className="form-control" name="name" type="name" placeholder="Name" />
        </div>

        <div>
        <label style={{ marginLeft:-280}}>
        <b>Email</b></label>
        <input  style={{width:320, marginLeft:20}} className="form-control" name="email" type="Email" placeholder="Email" />
        
        </div>

        <div>
        <label style={{ marginLeft:-210, marginTop:18}}>
        <b>Phone Number</b></label>
        <input style={{width:320, marginLeft:20}} className="form-control" name="phoneNumber" type="number" placeholder="Phone Number" />
        
        </div>

        <div>
        <label style={{ marginLeft:-240, marginTop:18}}> 
        <b>Description</b></label>
        <br></br> 
          <textarea style={{width:320, marginLeft:-5}} rows = "5" cols = "30" name = "description" placeholder= "Enter details here..">  
         </textarea>
        
        </div>
        
        <Link to="/Recived" style={{width:250, marginLeft:-20}}><Button style={{width:200}}>  
        Create
      </Button>
      </Link>
         <div>  
              
        <a href="/Login">Have an Account?</a>
        </div>
  <div id="mybutton">
<Link to="/Feedback"><button class="feedback" style={{width:200}}>Leave Feedback</button></Link>
</div>
      
          
      </form>
      
    </div>
    </Card>

  );
};

export default withRouter(Login);
