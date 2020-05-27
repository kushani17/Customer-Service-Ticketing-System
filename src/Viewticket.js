import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "./Auth.js";
import app from "./base.js";
import SearchInput, {createFilter} from 'react-search-input'
import Popup from "reactjs-popup";
import PopupFeedBack from './components/PopUpFeedback';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import StarsSharpIcon from '@material-ui/icons/StarsSharp';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const KEYS_TO_FILTERS = ['name','subject','description','status','createdby','email','agentname','agentemail'];
var filteredContent =[];
var queryParams='';
const AgentTicket = props => (
  
  <tr style={{color:"White"}} onClick={() => {window.location.href=("/agentedittickets/"+props.ticket._id)}}>
      <td>{props.ticket.name}</td>
      <td>{props.ticket.subject}</td>
      <td>{props.ticket.description}</td>
      <td>{props.ticket.date.substring(0,10)}</td>
      {props.ticket.status==="Pending"?  <td style={{color:"Red"}}>{props.ticket.status}  </td>:
      props.ticket.status==="InProgress"?<td style={{color:"Black"}}>{props.ticket.status}</td>:
      <td style={{color:"Green"}}>{props.ticket.status}</td>}     
      <td>{(props.ticket.priority===0?"Low":(props.ticket.priority===1?"Medium":"High"))}</td>
      <td>{props.ticket.createdby}</td>
      <td>{props.ticket.agentname}</td>
       
        <td>
        <div 
        onClick={event => event.stopPropagation()}>
       <Popup modal trigger={<StarsSharpIcon></StarsSharpIcon> }>
         
        {close => <PopupFeedBack close={close} isClient={false} ticketid={props.ticket._id} msg={props.ticket.name} />}
      </Popup></div>
          </td>   

    </tr>
  )

  const AdminTicket = props => (
  
    <tr style={{color:"White"}} onClick={() => {window.location.href=("/agentedittickets/"+props.ticket._id)}}>
      <td>{props.ticket.name}</td>
      <td>{props.ticket.subject}</td>
      <td>{props.ticket.description}</td>
      <td>{props.ticket.date.substring(0,10)}</td>
      {props.ticket.status==="Pending"?  <td style={{color:"Red"}}>{props.ticket.status}  </td>:
      props.ticket.status==="InProgress"?<td style={{color:"Black"}}>{props.ticket.status}</td>:
      <td style={{color:"Green"}}>{props.ticket.status}</td>}

      <td>{(props.ticket.priority===0?"Low":(props.ticket.priority===1?"Medium":"High"))}</td>
      <td>{props.ticket.createdby}</td>
      <td>{props.ticket.agentname}</td>

      <td> <div 
        onClick={event => event.stopPropagation()}>      
     <DeleteIcon onClick={() => { props.deleteTicket(props.ticket._id)}}/> 
    &nbsp;|&nbsp;
       <Popup modal trigger={<StarsSharpIcon></StarsSharpIcon>}>
        {close => <PopupFeedBack close={close} isClient={false} ticketid={props.ticket._id} msg={props.ticket.name} />}
      </Popup></div> 
          </td>   

    </tr>
  )
  const ClientTicket = props => (
  
    <tr style={{color:"White"}} onClick={props.ticket.status==="Pending"&&queryParams==''?(() => {window.location.href=("/edit/"+props.ticket._id)}):null}>    
      <td>{props.ticket.name}</td>
      <td>{props.ticket.subject}</td>
      <td>{props.ticket.description}</td>
      <td>{props.ticket.date.substring(0,10)}</td>
      {props.ticket.status==="Pending"?  <td style={{color:"Red"}}>{props.ticket.status}  </td>:
      props.ticket.status==="InProgress"?<td style={{color:"Black"}}>{props.ticket.status}</td>:
      <td style={{color:"Green"}}>{props.ticket.status}</td>}
      
      <td>{(props.ticket.priority===0?"Low":(props.ticket.priority===1?"Medium":"High"))}</td>
      <td>{props.ticket.createdby}</td>
      <td>{props.ticket.agentname}</td>
     
      {props.ticket.status==="Pending"? <td> <div onClick={event => event.stopPropagation()}>           
     <DeleteIcon onClick={() => { props.deleteTicket(props.ticket._id)}}/>
     &nbsp;|&nbsp;
     <Popup modal trigger={<StarsSharpIcon></StarsSharpIcon>} >
        {close => <PopupFeedBack close={close} isClient={true} ticketid={props.ticket._id} msg={props.ticket.name} />}
      </Popup></div>
          </td> 

        :<td><div onClick={event => event.stopPropagation()}> <DeleteForeverIcon/>
        &nbsp;|&nbsp;
        <Popup modal trigger={<StarsSharpIcon></StarsSharpIcon>} >
        {close => <PopupFeedBack close={close} isClient={true} ticketid={props.ticket._id} msg={props.ticket.name} />}
      </Popup></div></td> }


        
         
    </tr>
  )
export default class TicketList extends Component {

  static contextType = AuthContext;

    constructor(props){
        super(props);
        this.deleteTicket = this.deleteTicket.bind(this);
        this.state = {ticket : [],loopCount:0, searchTerm: '',showPopup: false};
        this.searchUpdated = this.searchUpdated.bind(this);
    }
    

    componentDidMount(){
        
    }
    

    deleteTicket(id) {
      confirmAlert({
        title: 'Alert',
        message: 'Are you sure want to delete?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
            axios.delete('http://localhost:5000/ticket/'+id)
          .then(response => {});
    
        this.setState({
          ticket: this.state.ticket.filter(el => el._id !== id)
        })}

          },
          {
            label: 'No',
          }
        ]
      })

      /*var cfm = window.confirm("Are you sure want to delete?");
      if(cfm)
      {
        axios.delete('http://localhost:5000/ticket/'+id)
          .then(response => {});
    
        this.setState({
          ticket: this.state.ticket.filter(el => el._id !== id)
        })
      }*/
    }
    
      clientTicketList() {
        return filteredContent.map(currentticket => {
         // return this.state.ticket.map(currentticket => {
          return <ClientTicket ticket={currentticket} deleteTicket={this.deleteTicket} key={currentticket._id}/>;
        })
      }

      agentTicketList() {
        return filteredContent.map(currentticket => {
         // return this.state.ticket.map(currentticket => {
          return <AgentTicket ticket={currentticket}  key={currentticket._id}/>;
        })
      }

      adminTicketList() {
        return filteredContent.map(currentticket => {
         // return this.state.ticket.map(currentticket => {
          return <AdminTicket ticket={currentticket} deleteTicket={this.deleteTicket} key={currentticket._id}/>;
        })
      }
      clientTicketListHeader()
      {
             return (<tr style={{borderColor: 'black'}}>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Name</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Subject</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}} >Description</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Date</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Status</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Priority</th>
              <th  style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Created By</th>
              <th  style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Agent</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Actions</th>

            </tr>)
      }
      agentTicketListHeader()
      {
        return (<tr style={{borderColor: 'black'}}>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Name</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Subject</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}} >Description</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Date</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Status</th>              
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Priority</th>
              <th  style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Created By</th>
              <th  style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Agent</th>
              <th  style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Actions</th>
            </tr>)
      }
     
      togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
         }  

      searchUpdated (term) {
        this.setState({searchTerm: term})
      }
    render(){
      filteredContent = this.state.ticket.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
      const {currentUser} = this.context;

      if(this.state.loopCount===0)
      {
      if(currentUser?app.auth().currentUser.displayName==="Client":false)
      {
        const payload ={ createdby:app.auth().currentUser.email}
        axios({
          url:'http://localhost:5000/ticket',
          method:'POST',
          data:payload 
                })
            .then(response => {
                this.setState({ ticket: response.data,
                  loopCount:1})
            })
            .catch((error) => {
                console.log(error);
            })
          }
      /*   else if(currentUser?app.auth().currentUser.displayName==="Admin":false)
      {
        const payload ={ createdby:'Admin'}
        axios({
          url:'http://localhost:5000/ticket',
          method:'POST',
          data:payload 
                })
            .then(response => {
                this.setState({ ticket: response.data,
                  loopCount:1})
            })
            .catch((error) => {
                console.log(error);
            })
          }
        */
        else if(currentUser?app.auth().currentUser.displayName==="Agent"||app.auth().currentUser.displayName==="Admin":false)
        
        {
          const payload ={ createdby:''}
          axios({
            url:'http://localhost:5000/ticket/getalltickets',
            method:'POST',
            data:payload 
                  })
              .then(response => {
                  this.setState({ ticket: response.data,
                    loopCount:1})
              })
              .catch((error) => {
                  console.log(error);
              })
            }

            else{
             queryParams = new URLSearchParams(this.props.location.search);
             

              if(queryParams.get('ticketid')!=null)
              {
                console.log("dd");
              const payload ={ ticketid:queryParams.get('ticketid')}
              axios({
                url:'http://localhost:5000/ticket/getunknownticketwithticketid',
                method:'POST',
                data:payload 
                      })
                  .then(response => {
                    this.setState({ ticket: response.data,
                        loopCount:1})
                  })
                  .catch((error) => {
                      console.log(error);
                  })
              }
              else if(queryParams.get('phone')!==null&&queryParams.get('email')!==null)
              {
              const payload ={ email:queryParams.get('email'),
                                phone:queryParams.get('phone')}
                                console.log(payload);
              axios({
                url:'http://localhost:5000/ticket/getunknownticketwithphoneandemail',
                method:'POST',
                data:payload 
                      })
                  .then(response => {
                      this.setState({ ticket: response.data,
                        loopCount:1})
                        console.log(response.data);
                  })
                  .catch((error) => {
                      console.log(error);
                  })
                }
            }

            
          }
        return(

            <div >
                <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Tickets</b></h2>
                <div >
      
      <SearchInput  style={{width:220, marginLeft:"auto", marginBottom: 10}} className="search-input" 
      placeholder="Search" onChange={this.searchUpdated}/>
      </div>

      <div>
        <table className="table">   
        <thead className="thead-light">
        {(currentUser?app.auth().currentUser.displayName==="Agent":false)?this.agentTicketListHeader():
          this.clientTicketListHeader()
        }
            
    </thead>
    <tbody>
    {(currentUser?app.auth().currentUser.displayName==="Agent":false)?this.agentTicketList():
     (currentUser?app.auth().currentUser.displayName==="Admin":false)?this.adminTicketList():this.clientTicketList()
    }
    
    
      
    </tbody>
  </table>
  </div>
  </div>
            
        )
    }
}