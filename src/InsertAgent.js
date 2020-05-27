import React, {Component } from 'react';
import axios from 'axios';
import { RegionDropdown} from 'react-country-region-selector';
import app from './base';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Agent extends Component {
  componentDidMount = () => {
  
  };
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      email: '',
      streetaddress: '',
      posts: [],
      city: '',
      state: '',
      zip: '',
      roles:['Agent','Admin'],
      role:''

    };
    this.state.role=this.state.roles[0];

  }

  
  selectRegion(val) {
    this.setState({ state: val });
  }

  async handleForm() {

    const createEmployeeUser = {
      email:this.state.email,
      role:this.state.role
    };
  
    
  
    await axios({
      url:'http://localhost:5000/createemployeeuser',
      method:'POST',
      data: createEmployeeUser
    }).then(function (response) {
    
      confirmAlert({
        title: 'Success',
        message: 'Agent added',
        buttons: [         
          {
            label: 'OK', onClick: () => {app.auth()
              .sendPasswordResetEmail(createEmployeeUser.email);
            
              window.location = '/insertagent';}
          }
        ]
      })
    
    })
    .catch((error)=>{
      confirmAlert({
        title: 'Error',
        message: 'EmailID already exists',
        buttons: [         
          {
            label: 'OK'
          }
        ]
      })
  
    });
  
    
        
    
  }
  roleChange = event => {
    const target = event.target;
    const value = target.value;

    this.setState({
      role: value
    });
  }
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };
 
 


  submit = (event) => {
    event.preventDefault();
    
       // console.log(payload);
       // console.log('data sent to server');
       
       {
         const payload = {
           name: this.state.name,
           role: this.state.role,
           phone: this.state.phone,
           email: this.state.email,
           address: this.state.address,
           city: this.state.city,
           state: this.state.state,
           zip: this.state.zip
         };
         axios({
           url:'http://localhost:5000/checkclientalreadyexists',
           method:'POST',
           data: payload
         }).then((response)=>{
          if(response.data.length===0)
         {
         axios({
           url: 'http://localhost:5000/agent/saveagent',
           method: 'POST',
           data: payload
         })
           .then(() => {
           })
           .catch(()=>{
             console.log('Internal server error');
           });
           }
         })
         .catch(()=>{
           console.log('Internal server error');
         });
         }
     

       this.handleForm();
     
  }
  render() {
    return (
      <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,
      paddingTop: 0.5,paddingBottom: 0.5}}>
        <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}>
          <b>Add Agent</b></h2>
          <div style={{textAlign:'-webkit-center'}}>
        <form onSubmit={this.submit}>
          <div className='form-group'  style={{width:350, textAlign:'left'}}>
            <label><b>Name</b></label>
            <input className="form-control"
              type='text'
              required
              name='name'
              maxLength="200"
              value={this.state.value}
              onChange={this.handleChange}
            />
    </div>

          <div className="form-group"  style={{width:350, textAlign:'left'}}> 
          <label><b>Role</b></label>

          <select ref="userInput"
              required
              className="form-control"
               name="role"
              maxLength="200"
              value={this.state.role}    
              onChange={this.roleChange}>
              {
                this.state.roles.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
          <div className='form-group'  style={{width:350, textAlign:'left'}}>
            <label> <b>Phone </b></label>
            <input className="form-control"
              type="tel" pattern="^\d{10}$"
              required
              name='phone'  maxLength="10"
              placeholder="Enter 10 digit number"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'  style={{width:350, textAlign:'left'}}>
            <label><b>EmailID</b></label>
            <input className="form-control"
              type='email'
              required
              name='email'
              maxLength="200"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group'  style={{width:350, textAlign:'left'}}>
            <label><b>Address</b></label>
            <input className="form-control"
              type='text'
              required
              name='address'
              maxLength="200"
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </div>
          {
            <div className='form-group'  style={{width:350, textAlign:'left'}}> 
              <label><b>City </b></label>
              <input className="form-control"
                type='text'
                required
                name='city'
                maxLength="200"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          }
         {/* <div className='form-group'>
            <label>State</label>
            <input className="form-control"
              type='text'
              required
              name='state'
              value={this.state.value}
              onChange={this.handleChange}
            />
        </div>*/}

         <div className="form-group"  style={{width:350, textAlign:'left'}}>
          <label> <b>State </b></label>
          <RegionDropdown
          className="form-control"
          required
          country= "United States"
          name="State"
          maxLength="200"
          value={this.state.state}
          onChange={(val) => this.selectRegion(val)} 
          />
          
           </div>
        

          <div className='form-group'  style={{width:350, textAlign:'left'}}>
            <label> <b>Zip Code </b></label>
            <input className="form-control"
              type='text'
              required
              name='zip'
              pattern="^\d{5}$"
              maxLength="5"
              placeholder="Enter 5 digit Zip Code"
              value={this.state.value}
              error={this.state.value > 5 ? 'Enter a number less than 12' : ''}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Add Agent" className="btn btn-primary" />
          </div>
        </form>
      </div>
      </div>
    );
  }
}
