import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class EditTicket extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      insurancetype: '',
      subject: '',
      description: '',
      date: new Date(),
      users: [],
      selectedinsurancetype:[],
      selectedinsurancesubcategory:[],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ticket/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          selectedinsurancetype: response.data.insurancetype,
          selectedinsurancesubcategory: response.data.insurancetypesubcategory,
          subject: response.data.subject,
          description: response.data.description,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  

  onSubmit(e) {
    e.preventDefault();

    const ticket = {
      subject: this.state.subject,
      description: this.state.description,
      
    }


    axios.post('http://localhost:5000/ticket/clientupdateticket/' + this.props.match.params.id, ticket)
      .then(/*res => console.log(res.data)*/
      confirmAlert({
        title: 'Success',
        message: 'Ticket updated',
        buttons: [         
          {
            label: 'OK', onClick: () => { window.location = '/viewticket'}
          }
        ]
      })

      );

    
  }

  render() {
    return (
    <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,
    paddingTop: 0.5,paddingBottom: 0.5}}>
      <h3 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Edit Ticket</b></h3>
      <div style={{textAlign:'-webkit-center'}}>
      <form onSubmit={this.onSubmit}>
      <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Name </b></label>
          <input  type="text"
              disabled
              className="form-control"
              maxLength="200"
              value={this.state.name}
              />
        </div>
        
        
{/*        <div className="form-group"> 
          <label>Insurance Type</label>
          <input  type="text"
              disabled
              className="form-control"
              maxLength="200"
              value={this.state.insurancetype}
              />
        </div>
    */}
    <div className="form-group" style={{width:350, textAlign:'left'}}> 
<label> <b>Insurance Type </b></label>
<div style={{backgroundColor:'white'}}>
<Multiselect
selectedValues={this.state.selectedinsurancetype}
displayValue="name" 
disablePreSelectedValues
placeholder=""

/>
</div>
</div>
<div className="form-group" style={{width:350, textAlign:'left'}}> 
<label><b>Insurance Type Sub Category</b></label>
<div style={{backgroundColor:'white'}}>
<Multiselect
  groupBy="insurancetype"
  displayValue="subcategory"
  selectedValues={this.state.selectedinsurancesubcategory}
  disablePreSelectedValues
  placeholder=" "  
  
/>
</div>
</div>


        <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Subject</b></label>
          <input  type="text"
              required
              className="form-control"
              maxLength="200"
              value={this.state.subject}
              onChange={this.onChangeSubject}
              />
        </div>

           <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Description</b></label>
          <textarea rows="5"
              required
              className="form-control"
              maxLength="1000"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group" style={{width:350, textAlign:'left'}}>
          <label><b>Date</b></label>
          <div>
            <DatePicker
            disabled
            maxLength="200"
              selected={this.state.date}
            />
          </div>
        </div>

        <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Update Ticket"  className="btn btn-primary" />
        </div>
      </form>
      </div>
    </div>
    )
  }
}