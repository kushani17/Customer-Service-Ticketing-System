import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import app from "../base.js";
import { AuthContext } from "../Auth";


export default class AgentEditTicket extends Component {

  static contextType = AuthContext;


  constructor(props) {
    super(props);

    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   //this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTicketStatus = this.onChangeTicketStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);

    this.state = {
      name: '',
      user: '',
      insurancetype: '',
      subject: '',
      description: '',
      date: new Date(),
      users: [],
      selectedinsurancetype:[],
      selectedinsurancesubcategory:[],
      ticketstatuses:['Pending','InProgress','Completed'],
      ticketstatus:'',
      prioritylist : [
        {key:'0',value:'Low'},
        {key:'1',value:'Medium'},
        {key:'2',value:'High'}
      ],
      priority:'',
      email:'',
      phone:'',
      createdby:'',
      agentname:'',
      agentemail:'',
      loopcount:0,

    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/ticket/'+this.props.match.params.id)
      .then(response => {
        this.setState({
         // users: response.data.map(user=>user.name),
         name: response.data.name,
         selectedinsurancetype: response.data.insurancetype,
          selectedinsurancesubcategory: response.data.insurancetypesubcategory,
         subject: response.data.subject,
          description: response.data.description,
          ticketstatus: response.data.status,
          priority: response.data.priority,
          email:response.data.email,
          phone:response.data.phone,
          createdby:response.data.createdby,
          date: new Date(response.data.date),

          //users: response.data.map(user => user.username),
        //  user: response.data[0].username

        })  
      })
      .catch(function (error) {
        console.log(error);
      })
    

  }

  roleChange = event => {
    const target = event.target;
    const value = target.value;

    this.setState({
      role: value
    });
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
  onChangeTicketStatus(e){
    this.setState({
        ticketstatus: e.target.value
    });
    
}
onChangePriority(e){
  this.setState({priority:e.target.value});
}
  

  onSubmit(e) {
    e.preventDefault();

    const ticket = {
      subject: this.state.subject,
      description: this.state.description,
      ticketstatus:this.state.ticketstatus,
      priority:this.state.priority,
      agentname:this.state.ticketstatus!="Pending"?this.state.agentname:'',
      agentemail:this.state.ticketstatus!="Pending"?this.state.agentemail:''
    }


    axios.post('http://localhost:5000/ticket/agentupdateticket/' + this.props.match.params.id, ticket)
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
    const {currentUser} = this.context;        
        
    if(this.state.loopcount===0&&currentUser!=null)
   {    
    if(currentUser)
    {    
     this.state.agentemail=currentUser?app.auth().currentUser.email:'';  
      const payload = {
      email:this.state.agentemail
      };
      
            axios({
                url:'http://localhost:5000/agent/getagentname',
                method:'POST',
                data:payload 
                      })
              .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        loopcount:1,
                        agentname:response.data[0].name,
                    })
                }
            })
          }              
    }

    return (
    <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,	
    paddingTop: 0.5,paddingBottom: 0.5}}>	
<h3 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Edit Ticket</b></h3>	
<div style={{textAlign:'-webkit-center'}}>
      <form onSubmit={this.onSubmit}>
     <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Name</b></label>
          <input  type="text"
              disabled
              className="form-control"
              maxLength="200"
              value={this.state.name}
              />
    </div>
    {(this.state.email!='')? <div><div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>EmailID</b></label>
          <input  type="text"
              disabled
              className="form-control"
              maxLength="200"
              value={this.state.email}
              />
        </div>
        
        <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Phone</b></label>
          <input  type="text"
              disabled
              className="form-control"
              maxLength="200"
              value={this.state.phone}
              />
        </div></div>:null}
        
        
       {/* <div className="form-group"> 
          <label>Insurance Type</label>
          <input  type="text"
              disabled
              className="form-control"
              maxLength="200"
              value={this.state.insurancetype}
              />
    </div>*/}
     <div className="form-group" style={{width:350, textAlign:'left'}}> 
<label><b>Insurance Type</b> </label>
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
<label><b>Insurance Type Sub Category</b> </label>
<div style={{backgroundColor:'white'}}>
<Multiselect
  groupBy="insurancetype"
  displayValue="subcategory"
  selectedValues={this.state.selectedinsurancesubcategory}
  disablePreSelectedValues
  placeholder=""  
  
/>
</div>
</div>

        <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Subject</b></label>
          <input  type="text"
              required
              disabled
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
              disabled
              className="form-control"
              maxLength="1000"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
       {/* <div className="form-group"> 
          <label>Roles: </label>

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
            */}
        <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Ticket Status</b> </label>
        <select ref="userInput"
              required
              className="form-control"
              value={this.state.ticketstatus}
              onChange={this.onChangeTicketStatus}>
              {
                this.state.ticketstatuses.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>

      { /* <div className="form-group"> 
          <label>Agents: </label>
        <select ref="userInput"
              
              className="form-control"
              value={this.state.user}
              onChange={this.onChangeName}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>*/}

        <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Priority</b> </label>
        <select ref="userInput"
              
              className="form-control"
              value={this.state.priority}
              onChange={this.onChangePriority}>
              {
                this.state.prioritylist.map(function(data, key) {
                  return  <option key={key} value={data.key}>{data.value}</option>;
                })
              }
          </select>
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
          <input type="submit" value="Update Ticket" className="btn btn-primary" />
        </div>
      </form>
      </div>
    </div>
    )
  }
}