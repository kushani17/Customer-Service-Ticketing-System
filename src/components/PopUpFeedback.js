import React from 'react';  
import './PopUpStyle.css';
import {Redirect, Link} from 'react-router-dom';
import './feedback.css';
import axios from 'axios';
import { Card } from 'react-bootstrap';


class PopupFeedBack extends React.Component {  
    constructor(props)
    {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
    this.state ={
    ticketid:this.props.ticketid,
    isclient:this.props.isClient,
    rating:'',
    feedbackid:'',
    description:''  };

    axios.get('http://localhost:5000/clientfeedback/'+this.state.ticketid)
    .then(response => {
      if (response.data.length > 0) {
      this.setState({
        rating: response.data[0].rating,
        description: response.data[0].description,
        feedbackid:response.data[0].feedbackid
      }) 
    }

    })
    .catch(function (error) {
      console.log(error);
    })
    


    }
    componentDidMount = () => {
      
    }  
    
    handleChange =(event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]:value
        });
      };
    onSubmit(usr){
           
        const feedback = {
            ticketid: this.state.ticketid,
            rating: this.state.rating,
            description: this.state.description,
           
        }
        axios.post('http://localhost:5000/clientfeedback/add', feedback)
            .then(  
               // alert("Ticket Created Successfully"),
           // window.location = '/viewticket'
            )
            .catch((error) => {
                console.log(error);
            });
          
    }

  render() {  
return (  
   

<div  style={{width:'auto', backgroundColor: '#66BAE7 ' ,margin: 'auto',marginTop: 0,
            paddingTop: 0.5,paddingBottom: 0.5, alignText: 'center', height:450}}>
              
            <h1 style={{ fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Leave Feedback</b></h1>
            <hr />
            
            <form >            
            <div style={{textAlign:'-webkit-center'}}>
            <h4>{this.props.msg}</h4></div>
            <div className="form-group" style={{textAlign:'-webkit-center'}}>
            <label><h5>How satisfied are you?</h5>
              
            <div className="rate" style={{textAlign:'-webkit-center'}}>
            <input type="radio" id="star5" name="rating" value="5" checked={this.state.rating==="5"} onChange={this.handleChange} />
            <label htmlFor="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rating" value="4" checked={this.state.rating==="4"} onChange={this.handleChange}/>
            <label htmlFor="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rating" value="3" checked={this.state.rating==="3"} onChange={this.handleChange}/>
            <label htmlFor="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rating" value="2" checked={this.state.rating==="2"} onChange={this.handleChange}/>
            <label htmlFor="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rating" value="1" checked={this.state.rating==="1"} onChange={this.handleChange}/>
            <label htmlFor="star1" title="text">1 star</label>
          </div>
          </label>
            </div>
            <div style={{textAlign:'-webkit-center', marginTop:-15}}>
        <label> <h5> Comments</h5></label>
        <br/>
          <textarea rows = "5" cols = "30" name = "description" placeholder= "Write Your Review here" value = {this.state.description}
            onChange={this.handleChange}>  
         </textarea>
         </div>
              <div style={{textAlign:'-webkit-center'}}> 
       {(this.state.isclient?this.state.feedbackid=="":false)?<button className="btn btn-lg btn-primary" style={{width:150}} onClick={this.onSubmit}>Submit</button>
       :<button className="btn btn-lg btn-primary" style={{width:150}} onClick={this.props.close}><b>Close</b></button> 
        }
        </div>
        
            </form>
</div>  

);  
}  
}  

export default PopupFeedBack;