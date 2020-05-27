import React, { Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import app from "../base.js";
import { AuthContext } from "../Auth";
import { Multiselect } from 'multiselect-react-dropdown';
import Card from '../components/UIElements/Card';
import Button from '../components/FormElements/Button';
import {Redirect, Link} from 'react-router-dom';
import '../Style.css';



export default class SearchTicketStatus extends Component {

    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.onSubmitwithPhoneandEmail = this.onSubmitwithPhoneandEmail.bind(this);
        this.onSubmitwithTicketID = this.onSubmitwithTicketID.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeTicketID = this.onChangeTicketID.bind(this);


        this.state = {
            phone:'',
            email:'',
            ticketid:''
        }
        
    }
    onChangeTicketID(usr){
        this.setState({
            ticketid: usr.target.value
        });
    }
    onChangePhone(usr){
        this.setState({
            phone: usr.target.value
        });
    }
    onChangeEmail(usr){
        this.setState({
            email: usr.target.value
        });
    }
    onSubmitwithTicketID(usr)   
    {
    usr.preventDefault();
    this.props.history.push(
        {
            pathname: '/viewticket',
            search: '?ticketid='+this.state.ticketid
            
        })
    }

    onSubmitwithPhoneandEmail(usr){
        usr.preventDefault();
        this.props.history.push(
            {
                pathname: '/viewticket',
                search: '?email='+this.state.email+'&phone='+this.state.phone
                
            })
          
    }
    
            
    render(){
        
        
        
          
        return(
            
            <div>
                <Card className="authentication">
      <h2 style={{color:'#233492', fontFamily:'Times New Roman', margin: 5, fontWeight:'bold' }}>Find Your Ticket</h2><hr/>
      <form onSubmit={this.onSubmitwithPhoneandEmail}>
     
        <div className="form-group">
          <label style={{color:'darkblue', marginLeft:-310, marginBottom:-5 ,fontFamily: 'Arial-black', fontSize:20}}><b>Phone</b></label>
            <input className="form-control"
            required
            type="tel" pattern="^\d{10}$"
            placeholder="Enter 10 digit number"
            name="phone"
            maxLength="10"
            value = {this.state.value}
            onChange={this.onChangePhone}
            />
          </div>
          <div className="form-group">
          <label style={{color:'darkblue', marginLeft:-290, marginBottom:-5 ,fontFamily: 'Arial-black', fontSize:20}}><b>EmailID</b></label>
            <input className="form-control"
            required
            type="email"
            name="email"
            maxLength="200"
            value = {this.state.value}
            onChange={this.onChangeEmail}
            />
          </div>
          <div> 
          <Button type="submit" className="button">Search All</Button>
       
        </div>
      </form>

          <hr/>
          
          <form onSubmit={this.onSubmitwithTicketID}>
          <div className="form-group">
          <label style={{color:'darkblue', marginLeft:-290, marginBottom:-5 ,fontFamily: 'Arial-black', fontSize:20}}><b>Ticket ID</b></label>
            <input className="form-control"
            required
            type="text"
            name="ticketid"
            maxLength="200"
            value = {this.state.value}
            onChange={this.onChangeTicketID}
            />
            </div>
            <div> 
            <Button type="submit" className="button">Search</Button>
     
        </div>
         </form>
      </Card>
    </div>
        )
    }
}