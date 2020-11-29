import React from "react";
import Button from "react-bootstrap/Button";

import "./Welcome.scss";

function Welcome(props) {
  const onLogin = () => {
    props.history.push("/login");
  };
  const onCreateAccount = () => {
    props.history.push("/createaccount");
  };

  return (
    <div className="welcome-container">
      <div id="welcome-message"> Welcome to Wish List</div>
      <div className="welcome-buttons">
        <Button variant="dark" onClick={onLogin}>
          Sign In
        </Button>
        <Button variant="dark" onClick={onCreateAccount}>
          Create an Account
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
