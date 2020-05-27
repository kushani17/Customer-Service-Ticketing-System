
import React, { Component } from 'react';
import axios from 'axios';
import { RegionDropdown } from 'react-country-region-selector';
import app from "./base";
import { Multiselect } from 'multiselect-react-dropdown';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';


export default class InsertClient extends Component {
  
  componentDidMount = () => {
  
    axios.get('http://localhost:5000/insurancetype/')
    .then(response =>{
        if (response.data.length > 0) {
            this.setState({
                optionsInsuranceType:response.data,
                insurancetypes: response.data.map(user => user.name),
                insurancetype: response.data[0].name  
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
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.SaveData = this.SaveData.bind(this);
    this.onSelectSubcategory = this.onSelectSubcategory.bind(this);
    this.onRemoveSubcategory = this.onRemoveSubcategory.bind(this);
    this.multiselectRef = React.createRef();

 this.state ={
  name:'',
  company:'',
  insurancetype:'',
  insurancetypes:[],
  phone:'',
  email:'',
  city:'',
  state:'',
  refferedby:'',
  posts:[],
  country:'',
  region:'',
  id:null,
  optionsInsuranceTypeSubcategorydynm:[],           
  optionsInsuranceType:[],
  optionsInsuranceTypeSubcategory:[],
  selectedinsurancetype:[],
  selectedinsurancesubcategory:[]
};

  }


 
  selectRegion (val) {
    this.setState({ state: val });
  }
/*getpostdata =() => {
  axios.get('http://localhost:5000/apk/'+this.state.id)
  .then((response)=>{
    const data = response.data;
    this.setState({posts:data});
  })
  .catch(() =>{
    alert("error in retrieving");
  });  
}*/
 SaveData()
{
  const payload = {
    name: this.state.name,
    company:this.state.company,
    insurancetype:this.state.selectedinsurancetype,
    insurancetypesubcategory:this.state.selectedinsurancesubcategory,
    phone:this.state.phone,
    email:this.state.email,
    city:this.state.city,
    state:this.state.state,
    refferedby:this.state.refferedby
   
  };

  var resData='';
  axios({
    url:'http://localhost:5000/agent/checkemployeealreadyexists',
    method:'POST',
    data: payload
  }).then((response)=>{
   if(response.data.length===0)
  {
  
  axios({
    url:'http://localhost:5000/save',
    method:'POST',
    data: payload
  }).then(()=>{
    //console.log(payload);
    //console.log("data sent to server");
  })
  .catch(()=>{
    console.log('Internal server error');
  });
  }
})
.catch(()=>{
  console.log('Internal server error');
});
}

async handleForm() {

 
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
        

  const createClientUser = {
    email:this.state.email
   
  };
  this.SaveData();
   await axios({
    url:'http://localhost:5000/createclientuser',
    method:'POST',
    data: createClientUser
  }).then(function (response) {
    
    confirmAlert({
      title: 'Success',
      message: 'Client added',
      buttons: [         
        {
          label: 'OK', onClick: () => { 
               app.auth()
            .sendPasswordResetEmail(createClientUser.email);
          
          window.location = '/insertclient';

          }
        }
      ]
    })
  
  })
  .catch((error)=>{
    confirmAlert({
      title: 'Error',
      message: 'EmailID already exists',
      buttons: [         
        {
          label: 'OK'
        }
      ]
    })

  });

      
   
  }

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
    this.handleForm();

    
    
  }

  onSelectSubcategory(selectedList, selectedItem) {
     //console.log(selectedList);
     this.state.selectedinsurancesubcategory=selectedList;
  }

  onRemoveSubcategory(selectedList, removedItem) {
    //console.log(selectedList);
    this.state.selectedinsurancesubcategory=selectedList;
  }

  onSelect(selectedList, selectedItem) {
        this.setState({optionsInsuranceTypeSubcategorydynm:this.state.optionsInsuranceTypeSubcategorydynm.concat(this.state.optionsInsuranceTypeSubcategory.filter(e => ( e.insurancetype=== selectedItem.name)))});
  //console.log(selectedList);
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
        <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}>
          <b>Add Client</b></h2>
          <div style={{textAlign:'-webkit-center'}}>
        <form onSubmit={this.submit}>
          
          <div className="form-group" style={{width:350, textAlign:'left'}}>
          
          <label className="col-form-label"><b>Name</b></label>
            <input className="form-control" 
            required
            type="text"
             name="name"
             maxLength="200"
            value = {this.state.value}
            onChange={this.handleChange}
            />
          </div>
          <div className="form-group" style={{width:350, textAlign:'left'}}>
          <label><b>Company</b></label>
          <input className="form-control"
            type="text"
            name="company"
            maxLength="200"
            value = {this.state.value}
            onChange={this.handleChange}
            />
          </div>

       {/*   <div className="form-group"> 
          <label>Type of Insurance: </label>
          <select ref="userInput"
              required
              className="form-control"
            name="insurancetype"
            maxLength="200"
              value={this.state.insurancetype}
             onChange={this.handleChange}>
              {
                this.state.insurancetypes.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
              
          </select>
            </div>*/}

<div className="form-group"style={{width:350, textAlign:'left'}}> 
<label><b>Insurance Type</b> </label>
<div style={{backgroundColor:'white'}}>
<Multiselect
options={this.state.optionsInsuranceType} // Options to display in the dropdown
selectedValues={this.state.temptest} // Preselected value to persist in dropdown
onSelect={this.onSelect} // Function will trigger on select event
onRemove={this.onRemove} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options

/>
</div></div>
<div className="form-group" style={{width:350, textAlign:'left'}}> 
<label><b>Insurance Type Sub Category</b> </label>
<div style={{backgroundColor:'white'}}>
<Multiselect
  options={this.state.optionsInsuranceTypeSubcategorydynm}
  groupBy="insurancetype"
  displayValue="subcategory"
  selectedValues={this.state.selectedValues}
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
          <label><b>Phone</b></label>
            <input className="form-control"
            required
            type="tel" pattern="^\d{10}$"
            placeholder="Enter 10 digit number"
            name="phone"
            maxLength="10"
            value = {this.state.value}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
            />
          </div>
         
         {/* <div className="form-input">
          <label>City</label>
            <input
            type="text"
            name="city"
            value = {this.state.value}
            onChange={this.handleChange}
            />
          </div >
         {<div>
          <CountryDropdown
          value={country}
          onChange={(val) => this.selectCountry(val)} />
          } 
        </div>*/}
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
          <label><b>City</b></label>
            <input className="form-control"
            required
            type="text"
            name="city"
            maxLength="200"
            value = {this.state.value}
            onChange={this.handleChange}
            />
          </div>
          <div className="form-group" style={{width:350, textAlign:'left'}}>
          <label><b>Reffered By</b></label>
            <input className="form-control"
            
            type="text"
            name="refferedby"
            maxLength="200"
            value = {this.state.value}
            onChange={this.handleChange}
            />
          </div>
          
          <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Add Client" className="btn btn-primary" />
          </div>
          
        </form>
       
              </div>
</div>      
    );
  }
}