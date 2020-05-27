import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input'
import DeleteIcon from '@material-ui/icons/Delete';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const KEYS_TO_FILTERS = ['name','role','phone','email','address','city','state','zip'];

var filteredContent =[];

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.deleteTicket = this.deleteTicket.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);

    this.state = {
      posts: [],searchTerm: ''
    };
    
  }

  componentDidMount = () => {
    this.getpostdata();
  };

  getpostdata = () => {
    axios
      .get('http://localhost:5000/agent/api')
      .then(response => {
        const data = response.data;
        this.setState({ posts: data });

        //console.log('Data received');
        //console.log(data);
      })
      .catch(() => {
        alert('Error in Retrieving Information');
      });
  };

  deleteTicket(id) {
    confirmAlert({
      title: 'Alert',
      message: 'Are you sure want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.get('http://localhost:5000/agent/delete/' + id).then(response => {
     // console.log(response.data);
    });
    const currentemailrow = {
      email:
      this.state.posts.filter(el => el._id === id)[0].email
    }
    axios({
      url:'http://localhost:5000/firebasedeleteuser',
      method:'POST',
      data: currentemailrow
    }).then(()=>{
     
    })
    window.location='/viewagent';

       }

        },
        {
          label: 'No',
        }
      ]
    })

}

  renderProducts() {
    return filteredContent.map(product => {
      return (
        <tr style={{color:"White"}} key={product._id} onClick={() => {this.props.history.push({pathname:"/updateagent/",state:{ id: product._id}})}}>

          <td>{product.name}</td>
          <td>{product.role}</td>
          <td>{product.phone}</td>
          <td>{product.email}</td>
          <td>{product.address}</td>
          <td>{product.city}</td>
          <td>{product.state}</td>
          <td>{product.zip}</td>

          <td><div 
        onClick={event => event.stopPropagation()}>
            <DeleteIcon
              onClick={() => {
                this.deleteTicket(product._id);
              }}
            /></div>
          </td>
        </tr>
      );
    });
  }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render() {
    if(this.state.posts.length>0)
   filteredContent = this.state.posts.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
   
    return (
      <div>
        <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Agent Information</b></h2>
        <div>
      <SearchInput className="search-input"  style={{width:220, marginLeft:"auto", marginBottom: 10}} placeholder="  Search" onChange={this.searchUpdated}/>
      </div>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Name</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Role</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Phone</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>EmailID</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Address</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>City</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>State</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>ZipCode</th>
              <th style={{textAlign:'center', borderColor:'black', borderStyle:'solid'}}>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderProducts()}</tbody>
        </table>
      </div>
    );
  }
}
