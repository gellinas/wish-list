import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BackButton from "../components/BackButton/BackButton.jsx";
import { getUsers } from "../api.js";

import "./Login.scss";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUsers();
      setCurrentUser(userInfo);
    };
    fetchUser();
  }, []);

  const onEmailEntered = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordEntered = (event) => {
    setPassword(event.target.value);
  };

  const onLoginClick = (event) => {
    currentUser.documents.forEach((user) => {
      if (
        user.fields.email.stringValue === email &&
        user.fields.password.stringValue === password
      ) {
        props.history.push("/mywishlist", { userInfo: user });
      } else {
        setLoginError("Incorrect Email or Password");
        event.preventDefault();
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-head"> Sign In </div>
        <div className="login-form">
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={onEmailEntered}
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onPasswordEntered}
                value={password}
              />
            </Form.Group>
            <Button
              className="login-button"
              variant="dark"
              type="submit"
              onClick={onLoginClick}
            >
              sign in
            </Button>
            <div className="error-login">{loginError}</div>
            <BackButton {...props} />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
