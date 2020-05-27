import React,{useContext} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect  } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Reset from "./Reset";
import CreateTicket from "./Createticket";
import CreateInsuranceType from "./CreateInsuranceType";
import EditTicket from "./Editticket";
import ViewTicket from "./Viewticket";
import apps from "./base.js";


import InsertClient from "./InsertClient";
import UpdateClient from "./components/UpdateClient";
import Header from "./components/Header";

import ForgotPassword from "./components/login/Forgotpassword";
import UpdatePassword from "./components/login/Updatepassword";
import InsertAgent from "./InsertAgent";
import ViewAgent from "./components/ViewAgent";
import UpdateAgent from "./components/UpdateAgent";
import AgentEditTickets from "./components/AgentEditTicket";
import PopupFeedBack from "./components/PopUpFeedback";
import FeedBack from "./components/Feedback";
import CreateTicketAnonymous from "./components/CreateTicketAnonymous";

import { AuthProvider } from "./Auth";
import { AuthContext } from "./Auth.js";
import SearchTicketStatus  from "./components/SearchTicketStatus";
import CreateTicketAgent from "./components/CreateTicketAgent";


import ViewClient from "./components/ViewClient";



export default class app extends React.Component{
   
  static contextType = AuthContext;

  
  constructor(props){
    super(props);
     this.state = {
    userType: 'ddd',
    supAdminAuthDashboards: ['SuperAdmin'],
    adminAuthDashboards: ['SuperAdmin', 'Admin'],
    orgAuthDashboards: ['SuperAdmin', 'Admin', 'Organizer'],
    userAuthDashboards: ['SuperAdmin', 'Admin', 'Organizer', 'User'],
    loopCount:0
  };
}
  selectUserType = userType => {
    this.setState({
      userType: "SuperAdmin"
    });
  };

  
  
  
render(){
  
   // const currentUser = this.context;
     //alert(currentUser);
     //alert(currentUser?apps.auth().currentUser.displayName:'none');
    /*const {
      userType,
      supAdminAuthDashboards,
      adminAuthDashboards,
      orgAuthDashboards,
      userAuthDashboards
    } = this.state;*/

  return (

    <AuthProvider>
      
      <Router>
        <div>
        <Header selectUserTypeHandler={this.selectUserType}/>
          
          <Route exact path="/" component={Home} />
          
          {/* DEFAULT */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/Forgotpassword" component={ForgotPassword} />
          <Route exact path="/Updatepassword" component={UpdatePassword} />
          <Route exact path="/popupfeedback" component={PopupFeedBack} />
          <Route exact path="/createticketanonymous" component={CreateTicketAnonymous}/>
          <Route exact path="/searchticketstatus" component={SearchTicketStatus}/>
          {/* ADMIN */}
           <Route path = "/insertclient" render= { (props) => ('Clisent'=="Clisent")?<InsertClient {...props}/>:
            <Redirect to ='/login'  />}/>


          {/*<Route exact path="/insertemployee" component={InsertEmployee} />*/}
          <Route exact path="/updateclient" component={UpdateClient} />
          <Route exact path="/viewclient" component={ViewClient} />
          {/*<Route exact path="/viewemployee" component={Authorization(
                  ViewEmployee,
                  [...supAdminAuthDashboards],
                  (false)?apps.auth().currentUser.displayName:"dd"
          )} />*/}
          <Route exact path="/insertagent" component={InsertAgent} />
          <Route exact path="/updateagent" component={UpdateAgent} />
          <Route exact path="/viewagent" component={ViewAgent} />
          <Route exact path="/createinsurancetype" component={CreateInsuranceType} />
          <Route exact path="/agentedittickets" component={AgentEditTickets} />
          <Route exact path="/agentedittickets/:id" component={AgentEditTickets} />
          <Route exact path="/createticketagent" component={CreateTicketAgent}/>
          
          
      
          {/* CLIENT */}
          <Route exact path="/Createticket" component={CreateTicket} />
          <Route exact path="/Editticket" component={EditTicket} />
          <Route path="/edit/:id" component={EditTicket} />
          <Route exact path="/viewticket" component={ViewTicket} />


          
          {/*NOT USED
          <Route exact path="/feedback" component={FeedBack} />
          <Route exact path="/thankyou" component={ThankYou} />          
          <Route exact path="/Auth" component={Auth} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/Resetpassword" component={ResetPassword} />
          */
          }
          
        </div>
      </Router>

    </AuthProvider>
   
      
  );


  
}

}
