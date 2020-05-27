import React, { useCallback, Component } from 'react';
import axios from 'axios';
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from 'react-country-region-selector';
import app from '../';

export default class Agent extends Component {
  componentDidMount = () => {
    if (this.state.id != null) {
      this.getpostdata();
    }
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
      zip: ''
    };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }
  getpostdata = () => {
    axios
      .get('http://localhost:5000/apk/' + this.state.id)
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data received');
        console.log(data);
      })
      .catch(() => {
        alert('Error!');
      });
  };

  async handleForm() {
    const response = await app
      .auth()
      .createUserWithEmailAndPassword(this.state.email, 'kushaniaems');
    await app.auth().sendPasswordResetEmail(this.state.email);
    alert('Email sent');
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
      company: this.state.company,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    };

    axios({
      url: 'http://localhost:5000/saveagent',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log(payload);
        console.log('data sent to server');

        this.handleForm();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };
  render() {
    const { country, region } = this.state;
    return (
      <div>
        <h2 style={{color:'#a0b6e6eb', fontFamily:'Times New Roman', marginTop:15}}>Agent Page</h2>
        <form onSubmit={this.submit}>
          <div className='form-input'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-input'>
            <label>Phone</label>
            <input
              type='text'
              name='phone'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-input'>
            <label>EmailID</label>
            <input
              type='text'
              name='email'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-input'>
            <label>Street Address</label>
            <input
              type='text'
              name='address'
              value={this.state.value}
              onChange={this.handleChange}
            ></input>
          </div>
          {
            <div className='form-input'>
              <label>City</label>
              <input
                type='text'
                name='city'
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          }
          <div className='form-input'>
            <label>State</label>
            <input
              type='text'
              name='state'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>

          <div className='form-input'>
            <label>Zip</label>
            <input
              type='text'
              name='state'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div></div>

          <div>
            <button>
              <center>Submit</center>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
