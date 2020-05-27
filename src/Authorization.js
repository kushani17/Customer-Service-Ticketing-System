
import React,{useContext} from 'react';
import app from "./base.js";
import { AuthContext } from "./Auth.js";

//const { currentUsers } = useContext(AuthContext);

const Authorization = (WrappedComponent, allowedRoles, userType) => {
   // const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
       // const {currentUser} = useContext(AuthContext);
      
  return class WithAuthorization extends React.Component {
    render() {
      if (allowedRoles.includes(userType)) {
        return <WrappedComponent {...this.props} />;
      } else {
        return (
          <div>
            <h3>
              This user type "{true?userType:"vaidees"}" not allowed to view the dashboard
              page/s of: "
            </h3>
            {allowedRoles.map(dashboard => {
              return <h2>-{dashboard}</h2>;
            })}
          </div>
        );
      }
    }
  };
};

export default Authorization;