import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import Button from "./components/FormElements/Button.js";
import Card from "./components/UIElements/Card.js";

const ResetPassword = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { NewPassword1 } = event.target.elements;
      try {
        await app
          .auth().getUserByEmail('vaideesbe@gmail.com').
          updatePassword(NewPassword1.value).then(function()
          {alert('Password has been changed')})
         
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
        <Card className="authentication">
        <h2>Reset Password</h2>
        <hr />
      <form onSubmit={handleLogin}>
        <label>
          New password
          <input name="NewPassword1" type="password" placeholder="Password" />
        </label>
        <label>
        New password
          <input name="NewPassword2" type="password" placeholder="Password" />
        </label>
       <div>
         
        <Button type="submit">Reset</Button>
        </div>
      </form>
      </Card>
    </div>
  );
};

export default withRouter(ResetPassword);
