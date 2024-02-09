import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  sendCreateAccountRequest,
  sendLoginRequest,
} from "../services/UserService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LandingScreen({ onLogin }) {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formSignUpValues, setFormSignUpValues] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const [formLoginValues, setFormLoginValues] = useState({
    email: "",
    password: "",
  });
  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  };

  const handleSignupClick = (event) => {
    event.preventDefault(); // Prevents the default behavior of the anchor tag
    setShowSignupModal(true); // Opens the modal
  };

  const handleCloseSignUpModal = () => {
    setShowSignupModal(false); // Closes the modal
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleSignupRequest = () => {
    const { email, password, firstName, middleName, lastName } =
      formSignUpValues;

    sendCreateAccountRequest(email, password, firstName, middleName, lastName)
      .then(
        Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Your account has been created successfully",
          timer: 5000,
          showConfirmButton: false,
        })
      )
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Account Creation Failed",
          text: "Failed To Create Account",
          timer: 5000,
          showConfirmButton: false,
        });
      });
  };

  const handleSignUpInputChange = (event) => {
    const { name, value } = event.target;
    setFormSignUpValues({ ...formSignUpValues, [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setFormLoginValues({ ...formLoginValues, [name]: value });
  };

  const handleLoginRequest = () => {
    const { email, password } = formLoginValues;
    sendLoginRequest(email, password)
      .then((data) => {
        if (data.message) {
          if (data.message === "Wrong Username or Password") {
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Wrong Username or Password",
              showConfirmButton: false,
              timer: 800,
            });
          } else {
            // Simulating a successful login
            sessionStorage.setItem("isLoggedIn", "true");

            Swal.fire({
              icon: "success",
              title: "Login Successful",
              showConfirmButton: false,
              timer: 1500,
            });

            onLogin();
            navigate("/dashboard");
          }
        } else {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          onLogin();
          sessionStorage.setItem("isLoggedIn", "true");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Wrong Username or Password",
          showConfirmButton: false,
          timer: 800,
        });
      });
  };

  return (
    <div>
      <div className="wrapper">
        <div className="image-holder">
          <img src="assets/registration-form-8.jpg" alt="" />
        </div>
        <div className="form-inner">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="col-lg-12">
              <div className="form-header">
                <h3>MedSys</h3>
                <img
                  src="assets/sign-up.webp"
                  alt=""
                  className="sign-up-icon"
                />
              </div>
              <Form.Group controlId="signup-email">
                <Form.Label for="email">Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  value={formLoginValues.email}
                  onChange={handleLoginInputChange}
                />
              </Form.Group>
              <Form.Group
                controlId="signup-password"
                style={{ marginTop: "10px" }}
              >
                <Form.Label for="password">Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  required
                  value={formLoginValues.password}
                  onChange={handleLoginInputChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={handleLoginRequest}
              >
                Login
              </Button>
              <Button
                variant="secondary"
                type="submit"
                onClick={handleSignupClick}
              >
                Create my account
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Modal show={showSignupModal} onHide={handleCloseSignUpModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="signup-email">
              <Form.Label for="email" style={{ color: "black !important" }}>
                Email:
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={formSignUpValues.email}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-password"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="password">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                value={formSignUpValues.password}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-firstName"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="firstName">First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                required
                value={formSignUpValues.firstName}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-middleName"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="middleName">Middle Name:</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={formSignUpValues.middleName}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
            <Form.Group
              controlId="signup-lastName"
              style={{ marginTop: "15px" }}
            >
              <Form.Label for="lastName">Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                required
                value={formSignUpValues.lastName}
                onChange={handleSignUpInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="primary"
              onClick={handleSignupRequest}
            >
              Sign Up
            </Button>
            <Button variant="secondary" onClick={handleCloseSignUpModal}>
              Close
            </Button>
            {/* Additional buttons or actions */}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default LandingScreen;
