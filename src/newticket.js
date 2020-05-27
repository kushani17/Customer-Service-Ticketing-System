import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';

export default class newticket extends Component {
    render() {
        return (
            <div style={{width: 500, backgroundColor: '#32dede4a' ,margin: 'auto',marginTop: 50,
            paddingTop: 0.5,paddingBottom: 0.5}}>
            <Card className="authentication">
            <h2 style={{color:'#f2f3f5', fontFamily:'Times New Roman',fontSize:32, margin: 5, textAlign:'center', marginTop:30 }}><b>Raise a new ticket</b></h2>
            <hr />
            <form >
            <label>Type of Insurance:</label>
            <select id="insurance">
                 <option value="Health">Health</option>
                <option value="Bussiness">Bussiness</option>
                <option value="Compliance">Compliance</option>
                <option value="Visitor">Visitor</option>
            </select><br></br>
            <label>Comments:</label>
            <textarea      
              id="comments"
              type="text" 
            /><br></br> 
            <Link to="/ticketraised"><Button>
            Submit 
          </Button>
          </Link>
            </form>
          </Card>
            </div>
        )
    }
}
