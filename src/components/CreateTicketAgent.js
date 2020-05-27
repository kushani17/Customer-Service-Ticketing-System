
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
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class CreateTicketAgent extends Component {
    static contextType = AuthContext;
    constructor(props){
        super(props);
       
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeInsuranceType = this.onChangeInsuranceType.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSelectSubcategory = this.onSelectSubcategory.bind(this);
        this.onRemoveSubcategory = this.onRemoveSubcategory.bind(this);
        this.multiselectRef = React.createRef();
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.state = {
            name: '',
            createdby:'',
            insurancetype: '',
            subject: '',
            description: '',
            date: new Date(),
            insurancetypes: [],
            loopcount:0,
            status:'',
            optionsInsuranceTypeSubcategorydynm:[],           
            optionsInsuranceType:[],
            optionsInsuranceTypeSubcategory:[],
            selectedinsurancetype:[],
            selectedinsurancesubcategory:[],
            phone:'',
            email:''
        }
        
    }
componentDidMount()
{
    
 
       axios.get('http://localhost:5000/insurancetype/')
           .then(response =>{
               if (response.data.length > 0) {
                   this.setState({
                       optionsInsuranceType:response.data
                   })
               }
           })
           axios.get('http://localhost:5000/insurancetype/viewsubcategory')
           .then(response =>{
               if (response.data.length > 0) {
                   this.setState({
                      optionsInsuranceTypeSubcategory:response.data
                   })
  
  
               }
           })
           
       
     
}    
    onChangeName(usr){
        this.setState({
            name: usr.target.value
        });
    }
    onChangeInsuranceType(usr){
        this.setState({
            insurancetype: usr.target.value
        });
    }
    onChangeSubject(usr){
        this.setState({
            subject: usr.target.value
        });
    }
    onChangeDescription(usr){
        this.setState({
            description: usr.target.value
        });
    }
    onChangeDate(usr){
        this.setState({
            date: usr
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
     onSubmit(usr){
        usr.preventDefault();
        if(this.state.selectedinsurancetype.length<=0||this.state.selectedinsurancesubcategory.length<=0)
       {
       confirmAlert({
        title: 'Alert',
        message: 'Please select valid insurance type',
        buttons: [         
          {
            label: 'OK',
          }
        ]
      })
      }
      else
      {
        const ticket = {
            name: this.state.name,
            insurancetype: this.state.selectedinsurancetype,
            insurancetypesubcategory: this.state.selectedinsurancesubcategory,
            subject: this.state.subject,
            description: this.state.description,
            status:"Pending",
            date: this.state.date,
            createdby:this.state.createdby,
            priority:0,
            phone:this.state.phone,
            email:this.state.email,
            agentname:'',
            agentemail:''
        }
        //console.log(ticket);
        const payload ={ email:this.state.email,
                phone:this.state.phone}
        axios.post('http://localhost:5000/ticket/add', ticket)
            .then(  
                
         axios({
            url:'http://localhost:5000/ticket/getunknownticketwithphoneandemail',
            method:'POST',
            data:payload 
            })
            .then(response => {
                     //alert("Ticket Created Successfully and you ticket number is "+response.data[0]._id);
                    // console.log(response.data);
                     confirmAlert({
                        title: 'Success',
                        message: 'Ticket created, Ticket ID is: '+response.data[0]._id,
                        buttons: [         
                          {
                            label: 'OK', onClick: () => { window.location = '/createticketagent'}
                          }
                        ]
                      })
                })
                
            .catch((error) => {
                console.log(error);
                    })
                    
            )
            .catch((error) => {
                console.log(error);
            });
        }
          
    }


    onSelectSubcategory(selectedList, selectedItem) {
        this.state.selectedinsurancesubcategory=selectedList;
     }
   
     onRemoveSubcategory(selectedList, removedItem) {
       this.state.selectedinsurancesubcategory=selectedList;
     }
   
     onSelect(selectedList, selectedItem) {
           this.setState({optionsInsuranceTypeSubcategorydynm:this.state.optionsInsuranceTypeSubcategorydynm.concat(this.state.optionsInsuranceTypeSubcategory.filter(e => ( e.insurancetype=== selectedItem.name)))});
     this.state.selectedinsurancetype=selectedList;
   
         }

         onRemove(selectedList, removedItem) {
            this.multiselectRef.current.resetSelectedValues();
             if(this.state.optionsInsuranceTypeSubcategorydynm.length>0)
              this.setState({optionsInsuranceTypeSubcategorydynm:(this.state.optionsInsuranceTypeSubcategorydynm.filter(e => ( e.insurancetype!== removedItem.name)))});  
              this.state.selectedinsurancetype=selectedList;
          
            }
            
    render(){
        
        const {currentUser} = this.context;        
        
        if(this.state.loopcount===0&&currentUser!=null)
       {    
           this.state.createdby=currentUser?app.auth().currentUser.displayName:'Anonymous';
           this.state.loopcount=1;
         // this.setState({loopcount:1,createdby:currentUser?app.auth().currentUser.displayName:'Anonymous'});
       }
  
        
          
        return(
            
            <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,
            paddingTop: 0.5,paddingBottom: 0.5}}>
      <h3 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Create New Ticket</b></h3>
      <div style={{textAlign:'-webkit-center'}}>
      <form onSubmit={this.onSubmit}>
      <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Name</b> </label>
          <input  type="text"  
              required
              maxLength="200"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group" style={{width:350, textAlign:'left'}}>
          <label><b>Phone</b></label>
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
          <div className="form-group" style={{width:350, textAlign:'left'}}>
          <label><b>EmailID</b></label>
            <input className="form-control"
            required
            type="email"
            name="email"
            maxLength="200"
            value = {this.state.value}
            onChange={this.onChangeEmail}
            />
          </div>
        
        <div className="form-group" style={{width:350, textAlign:'left'}}>
    
<label><b>Insurance Type</b> </label>
<div style={{backgroundColor:'white'}}>
<Multiselect
className="form-control"
options={this.state.optionsInsuranceType} // Options to display in the dropdown
onSelect={this.onSelect} // Function will trigger on select event
onRemove={this.onRemove} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>
</div>
</div>
<div className="form-group" style={{width:350, textAlign:'left'}}>
<label><b>Insurance Type Sub Category</b> </label>
<div style={{backgroundColor:'white'}}>
<Multiselect
className="form-control"
  options={this.state.optionsInsuranceTypeSubcategorydynm}
  groupBy="insurancetype"
  displayValue="subcategory"
  closeOnSelect={false}
  name="sublevel"
  onSelect={this.onSelectSubcategory} // Function will trigger on select event
  onRemove={this.onRemoveSubcategory} // Function will trigger on select event
  showCheckbox={true}
  ref={this.multiselectRef}
  
  

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
        

       
        <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Create Ticket" className="btn btn-primary" />
          </div>
        

        
      </form>
    </div>
    </div>
        )
    }
}