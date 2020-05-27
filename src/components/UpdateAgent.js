import React from 'react';
import axios from 'axios';
import { RegionDropdown } from 'react-country-region-selector';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Update extends React.Component {
  componentDidMount = () => {
    this.getpostdata();
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      posts: [],
      id: '', 
    };

   // console.log(this.props.location.state.id);
  }

  getpostdata = () => {
    axios
      .get('http://localhost:5000/agent/apk/' + this.props.location.state.id)
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });
       // console.log('Data received');
        //console.log(data);
        this.setState({ name: data.name });
        this.setState({ role: data.role });
        this.setState({ phone: data.phone });
        this.setState({ email: data.email });
        this.setState({ address: data.address });
        this.setState({ city: data.city });
        this.setState({ state: data.state });
        this.setState({ zip: data.zip });
      })
      .catch(() => {
        console.log('Error in Retrieving Information');
      });
  };
 
  selectRegion (val) {
    this.setState({ state: val });
  }
  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  submit = event => {
    event.preventDefault();
    const payload = {
      
      name: this.state.name,
      role: this.state.role,
      phone: this.state.phone,
      email: this.state.email,
      address:this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      id: this.props.location.state.id
    };

    axios({
      url: 'http://localhost:5000/agent/update',
      method: 'POST',
      data: payload
    })
      .then(() => {
        confirmAlert({
          title: 'Success',
          message: 'Agent updated',
          buttons: [         
            {
              label: 'OK', onClick: () => { window.location = '/viewagent'}
            }
          ]
        })

      })
      .catch(() => {
        console.log('Internal Server Error');
      });
  };
  render() {
    return (
      <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,	
    paddingTop: 0.5,paddingBottom: 0.5}}>	
<h3 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Edit Agent</b></h3>	
<div style={{textAlign:'-webkit-center'}}>
        <form onSubmit={this.submit}>
          <div className='form-group' style={{width:350, textAlign:'left'}}> 
            <label><b>Name</b></label>
            <input className="form-control" 
              required
              type='text'
              name='name'
              readOnly
              maxLength="200"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Role</b> </label>

          <input className="form-control" 
              required
              type='text'
              name='role'
              readOnly
              maxLength="200"
              value={this.state.role}
            />
        </div>
          <div className='form-group' style={{width:350, textAlign:'left'}}> 
            <label><b>Phone</b></label>
            <input className="form-control" 
            required
              type='tel' pattern="^\d{10}$"
              name='phone'  maxLength="10"
              placeholder="Enter 10 digit number"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-group' style={{width:350, textAlign:'left'}}> 
            <label><b>EmailID</b></label>
            <input className="form-control" 
              required
              type='text'
              name='email'
              readOnly
              maxLength="200"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
              <div className ="form-group" style={{width:350, textAlign:'left'}}> 
            <label><b>Address</b></label>
            <input className="form-control" 
            required
            type='text'
            name='address'
            maxLength="200"
            value={this.state.address}
            onChange ={this.handleChange}
            />
            </div>
        
          <div className='form-group' style={{width:350, textAlign:'left'}}> 
            <label><b>City</b></label>
            <input className="form-control" 
              required
              type='text'
              name='city'
              value={this.state.city}
              maxLength="200"
              onChange={this.handleChange}
            />
          </div>
         {/*<div className='form-group'>
            <label>State</label>
            <input className="form-control" 
              type='text'
              name='state'
              value={this.state.state}
              onChange={this.handleChange}
             />*/}

             <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>State</b></label>
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
          <div className='form-group' style={{width:350, textAlign:'left'}}> 
              <label><b>Zip Code</b></label>
              <input className="form-control" 
              required
              type='text'
              name='zip'
              pattern="^\d{5}$"
              maxLength="5"
              placeholder="Enter 5 digit Zip Code"
              value = {this.state.zip}
              onChange = {this.handleChange}
            />
          </div>
          

          <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Update Agent" className="btn btn-primary" />
          </div>
        </form>
      </div>  
      </div>

    );
  }
}
