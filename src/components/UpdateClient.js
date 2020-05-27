
import React from 'react';
import axios from 'axios';
import { RegionDropdown } from 'react-country-region-selector';
import { Multiselect } from 'multiselect-react-dropdown';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class UpdateClient extends React.Component {
  
  componentDidMount = () => {
    
    
      this.getpostdata();

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
 
 
  constructor(props)
  {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSelectSubcategory = this.onSelectSubcategory.bind(this);
    this.onRemoveSubcategory = this.onRemoveSubcategory.bind(this);
    this.multiselectRef = React.createRef();

 this.state ={
  name:'',
  company:'',
  insurancetype:'',
  selectedinsurancetype:[],
  selectedinsurancesubcategory:[],
  optionsInsuranceTypeSubcategorydynm:[],   
  optionsInsuranceType:[],
  optionsInsuranceTypeSubcategory:[],        
  phone:'',
  email:'',
  city:'',
  state:'',
  refferedby:'',
  posts:[],
  id:''
  };

//console.log(this.props.location.state.id);
  }

  
getpostdata =() => {
  axios.get('http://localhost:5000/apk/'+this.props.location.state.id)
  .then((response)=>{
    const data = response.data;
    this.setState({posts:data});
    //console.log('Data receivedd');
    //console.log(data);
    this.setState({name:data.name});
    this.setState({company:data.company});
    this.setState({selectedinsurancetype:data.insurancetype});
    this.setState({selectedinsurancesubcategory:data.insurancetypesubcategory});
    this.setState({phone:data.phone});
    this.setState({email:data.email});
    this.setState({city:data.city});
    this.setState({state:data.state});
    this.setState({refferedby:data.refferedby});
  })
  .catch(() =>{
    console.log("Error in Retrieving Information");
  });  
}

selectRegion (val) {
  this.setState({ state: val });
}

  handleChange =(event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]:value
    });
  };

  submit = (event) => {
    event.preventDefault();
    const payload = {
      name: this.state.name,
      company:this.state.company,
      insurancetype:this.state.selectedinsurancetype,
      insurancetypesubcategory:this.state.selectedinsurancesubcategory,
      phone:this.state.phone,
      email:this.state.email,
      city:this.state.city,
      state:this.state.state,
      refferedby:this.state.refferedby,
     id:this.props.location.state.id
    };

    axios({
      url:'http://localhost:5000/update',
      method:'POST',
      data: payload
    }).then(()=>{
     // console.log(payload);
     // console.log("data sent to server");
     confirmAlert({
      title: 'Success',
      message: 'Client updated',
      buttons: [         
        {
          label: 'OK', onClick: () => { window.location = '/viewclient'}
        }
      ]
    })
    })
    .catch(()=>{
      console.log('Internal server error');
    });
    
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
  render()
  {
    
    return(
      
       <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,	
    paddingTop: 0.5,paddingBottom: 0.5}}>	
<h3 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Edit Client</b></h3>	
<div style={{textAlign:'-webkit-center'}}>
        <form onSubmit={this.submit}>
          
          <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Name</b></label>
            <input className="form-control" 
            type="text"
            required
             name="name" readOnly
             maxLength="200"
            value = {this.state.name}
            onChange={this.handleChange}
            />
          </div>
          <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Company</b></label>
            <input className="form-control" 
            
            type="text"
            name="company"
            maxLength="200"
            value = {this.state.company}
            onChange={this.handleChange}
            />
          </div>

          {/*<div className="form-group">
          <label>Insurance Type</label>
            <input className="form-control" 
            readOnly
            required
            type="text"
            name="insurancetype"
            maxLength="200"
            value = {this.state.insurancetype}
            />
    </div>*/}
    <div className="form-group" style={{width:350, textAlign:'left'}}> 
<label><b>Insurance Type</b></label>
<div style={{backgroundColor:'white'}}>
<Multiselect
options={this.state.optionsInsuranceType} 
selectedValues={this.state.selectedinsurancetype}
onSelect={this.onSelect} 
onRemove={this.onRemove} 
displayValue="name" 
/>
</div>
</div>
<div className="form-group" style={{width:350, textAlign:'left'}}> 
<label><b>Insurance Type Sub Category</b></label>
<div style={{backgroundColor:'white'}}>
<Multiselect
  options={this.state.optionsInsuranceTypeSubcategorydynm}
  groupBy="insurancetype"
  displayValue="subcategory"
  selectedValues={this.state.selectedinsurancesubcategory}
  closeOnSelect={false}
  onSelect={this.onSelectSubcategory} 
  onRemove={this.onRemoveSubcategory} 
  showCheckbox={true}
  ref={this.multiselectRef}

/>
</div>
</div>


          <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Phone</b></label>
            <input className="form-control" 
            required
            type="tel" pattern="^\d{10}$"
            placeholder="Enter 10 digit number"
            name="phone"
            maxLength="10"
            value = {this.state.phone}
            onChange={this.handleChange}
            />
          </div>
          <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>EmailID</b></label>
            <input className="form-control" 
            required
            type="text"
            name="email"
            readOnly
            maxLength="200"
            value = {this.state.email}
            onChange={this.handleChange}
            />
          </div>

          
          <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>City</b></label>
            <input className="form-control" 
            required
            type="text"
            name="city"
            maxLength="200"
            value = {this.state.city}
            onChange={this.handleChange}
            />
          </div>

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
          <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Reffered By</b></label>
            <input className="form-control" 
            type="text"
            name="refferedby"
            maxLength="200"
            value = {this.state.refferedby}
            onChange={this.handleChange}
            />
          </div>
          
          <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Update Client" className="btn btn-primary" />
          </div>
          
        </form>
      </div>
      </div>
    );
  }
}