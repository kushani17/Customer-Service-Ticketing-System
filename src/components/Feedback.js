import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

import './feedback.css';


export default class feedback extends Component {
    render() {
        return (
            <div>
            <h2>Leave Feedback</h2>
            <hr />
            <form >
            <div>
            <label> 
            <b>Rate</b>      
            
            <br/>
            <div class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>

            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
          </div>
          </label>
          </div>
            <div>
        <label> 
        <b>Review</b>
        <br></br> 
          <textarea rows = "5" cols = "30" name = "description" placeholder= "Write Your Review here">  
         </textarea>
        </label>
        </div>
        
          <Link to="/thankyou"><button>
          Submit
        </button>
        </Link>
              
              
              
            </form>
            </div>
        )
    }
}
