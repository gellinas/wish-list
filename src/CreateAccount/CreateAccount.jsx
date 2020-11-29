import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BackButton from "../components/BackButton/BackButton.jsx";
import { createAccount, getUsers } from "../api.js";

import "./CreateAccount.scss";

function CreateAccount(props) {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(null);
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(null);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState("");
  const [validConfirmPass, setValidConfirmPass] = useState(null);
  const [currentUsers, setCurrentUsers] = useState({});
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    const usersFetch = async () => {
      const usersInfo = await getUsers();
      setCurrentUsers(usersInfo);
    };
    usersFetch();
  }, []);

  const onNameChange = (event) => {
    setName(event.target.value);
    if (event.target.value !== "") {
      setValidName(true);
    } else {
      setValidName(false);
    }
  };

  const onUsernameChange = (event) => {
    setUsername(event.target.value);
    if (event.target.value !== "") {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value !== "") {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const onConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
    if (event.target.value !== "") {
      setValidConfirmPass(true);
    } else {
      setValidConfirmPass(false);
    }
  };

  const isValid = (valid, customError = "") => {
    if (valid === false) {
      return customError !== "" ? (
        <div className="error-message">{customError}</div>
      ) : (
        <div className="error-message">Please input a value</div>
      );
    }
  };

  const passwordsMatch = () => {
    if (password !== confirmPass) {
      return <div className="error-message">Passwords do not match</div>;
    }
  };

  const userAlreadyExists = () => {
    let userExists = false;
    currentUsers.documents.forEach((user) => {
      if (user.fields.email.stringValue === email) {
        userExists = true;
      }
    });
    return userExists;
  };

  const onCreateAccountSubmit = (event) => {
    const checkIfExists = userAlreadyExists();
    if (checkIfExists === true) {
      setSubmissionError("Email already exists");
      event.preventDefault();
    } else if (
      validName &&
      validUsername &&
      validEmail &&
      validPassword &&
      validConfirmPass &&
      password === confirmPass
    ) {
      const account = {
        fields: {
          name: { stringValue: name },
          username: { stringValue: username },
          email: { stringValue: email },
          password: { stringValue: password },
        },
      };
      createAccount(account);
      props.history.push("/mywishlist", { userInfo: { ...account } });
    } else {
      setSubmissionError("Please fill out all fields correctly");
      event.preventDefault();
    }
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <div className="create-account-head">Create Account</div>

        <div className="account-form">
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" onChange={onNameChange} value={name} />
              {isValid(validName, "Please enter your First Name")}
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={onUsernameChange}
                value={username}
              />
              {isValid(validUsername, "Please enter a Username")}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@address.com"
                onChange={onEmailChange}
                value={email}
              />
              {isValid(validEmail, "Please enter your email address")}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={onPasswordChange}
                value={password}
              />
              {isValid(validPassword, "Please enter a password")}
              <br />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={onConfirmPassChange}
                value={confirmPass}
              />
              {isValid(validConfirmPass, "Please confirm your password")}
              {passwordsMatch()}
            </Form.Group>

            <Button
              variant="dark"
              type="submit"
              onClick={onCreateAccountSubmit}
            >
              Create Account
            </Button>
            <div className="error-message">{submissionError}</div>
            <BackButton {...props} />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
