import React, { Component} from 'react';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class CreateInsuranceType extends Component {


    constructor(props){
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onAddInsuranceType = this.onAddInsuranceType.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onAddInsuranceSubcategory = this.onAddInsuranceSubcategory.bind(this);

        this.state = {
            name: '',
            insurancetypes:[],            
            insurancetype:'',
            optionsInsuranceTypeSubcategorydynm:[],           
            optionsInsuranceType:[],
            optionsInsuranceTypeSubcategory:[],
            
           
        };

    }
    componentDidMount = () => {
  
       

         axios.get('http://localhost:5000/insurancetype/viewsubcategory')
         .then(response =>{
             if (response.data.length > 0) {
                 this.setState({
                    optionsInsuranceTypeSubcategory:response.data
                 })


             }
         })

       //  console.log(this.state.optionsInsuranceTypeSubcategory);


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

     
             }
    
    handleChange =(event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]:value
    });
  };


  onAddInsuranceSubcategory= event => {
    event.preventDefault();

    const user = {
        insurancetype: this.state.insurancetype,
        subcategory: this.state.subcategory,
    }    
    axios.post('http://localhost:5000/insurancetype/addsubcategory', user)
      .then(/*res => console.log(res.data)*/);

   //alert("Insurance Type Subcategory Added Successfully")
   confirmAlert({
    title: 'Success',
    message: 'Insurance type subcategory added',
    buttons: [         
      {
        label: 'OK',onClick: () => {this.setState({subcategory:''})}
      }
    ]
  })
  }


    onAddInsuranceType= event => {
        event.preventDefault();
    
        const user = {
            name: this.state.name
        }    
        axios.post('http://localhost:5000/insurancetype/add', user)
          .then(/*res => console.log(res.data)*/);
    
      // alert("Insurance Type Added Successfully")
       confirmAlert({
        title: 'Success',
        message: 'Insurance type added',
        buttons: [         
          {
            label: 'OK',onClick: () => {this.setState({name:''})}
          }
        ]
      })
      }

      onSelect(selectedList, selectedItem) {
        

        this.setState({optionsInsuranceTypeSubcategorydynm:this.state.optionsInsuranceTypeSubcategorydynm.concat(this.state.optionsInsuranceTypeSubcategory.filter(e => ( e.insurancetype=== selectedItem.name)))});
      
    }
    
    onRemove(selectedList, removedItem) {
        
       if(this.state.optionsInsuranceTypeSubcategorydynm.length>0)
        this.setState({optionsInsuranceTypeSubcategorydynm:(this.state.optionsInsuranceTypeSubcategorydynm.filter(e => ( e.insurancetype!== removedItem.name)))});
     
        
        
    }
    
    render(){
        return(
            <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,
            paddingTop: 0.5,paddingBottom: 0.5}}>
                
            <div>
            <h3 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}> <b>Add Insurance type</b></h3>
            <div style={{textAlign:'-webkit-center'}}>
            <form onSubmit={this.onAddInsuranceType}>
                <div className="form-group" style={{width:350, textAlign:'left'}}   > 
                    <label><b>Insurance Type </b> </label>
                    <input  type="text"
                        required
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Add Insurance Type" className="btn btn-primary" />
          </div>
                </form>
                </div>
                <br/>
                <hr/>
                <br/>
                <div>
                <h3 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:-20 }}><b>Add Insurance type Subcategory</b></h3>
                <div style={{textAlign:'-webkit-center'}}>
                <form onSubmit={this.onAddInsuranceSubcategory}>
                <div className="form-group" style={{width:350, textAlign:'left'}}> 
          <label><b>Type of Insurance</b> </label>
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
        </div>
        
        <div className="form-group" style={{width:350, textAlign:'left'}}> 
                    <label><b>Insurance Type Subcategory </b></label>
                    <input  type="text"
                        required
                         name="subcategory"
                        className="form-control"
                        value={this.state.subcategory}
                        onChange={this.handleChange}
                    />
                </div>
                

        {/*   

<h3>Multi select option(Sample)</h3>

<div className="form-group"> 
<label>Insurance Type: </label>
<Multiselect
options={this.state.optionsInsuranceType} // Options to display in the dropdown
selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
onSelect={this.onSelect} // Function will trigger on select event
onRemove={this.onRemove} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options

/>
</div>
<div className="form-group"> 
<label>Insurance Type Sub Category: </label>
<Multiselect
  options={this.state.optionsInsuranceTypeSubcategorydynm}
  groupBy="insurancetype"
  displayValue="subcategory"
  selectedValues={this.state.selectedValues}
  name="sublevel"
  selectedValues=''
  showCheckbox={true}
        />
            </div>
*/}
                   <div className="form-group" style={{width:350, textAlign:'center'}}>
          <input type="submit" value="Add Subcategory" className="btn btn-primary" />
          </div>
            </form>
        </div>
        </div>
        </div>
        </div>
        )
    }
}