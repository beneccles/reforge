import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { updateUser } from "../../ducks/reducer";
import Zoom from "react-reveal/Zoom";
import "../../../node_modules/animate.css/animate.css";
import "./Register.css";
import { connect } from "react-redux";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: ""
    };
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value //Similar to ${}. Targets the passed in key specifically.
    });
  };

  register = () => {
    axios
      .post("/auth/register", this.state)
      .then(res => {
        this.props.history.push("/dashboard");
        swal.fire({ type: "success", text: res.data.message });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="Register">
        <div id="heroImage">
          <Zoom left>
            <div>
              <div className="tagline">
                <h1>REFORGED COMPUTERS</h1>
              </div>
            </div>
          </Zoom>
          <div className="registerBox">
            <h1 id="registerTitle">CREATE ACCOUNT:</h1>
            <input
              id="topOf"
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "username")}
              placeholder="username"
            />
            <input
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "firstName")}
              placeholder="First Name"
            />
            <input
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "lastName")}
              placeholder="Last Name"
            />
            <input
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "phone")}
              placeholder="Phone"
            />
            <input
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "email")}
              placeholder="Email"
            />
            <input
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "password")}
              placeholder="Password"
            />
            <button id="registerButton" onClick={() => this.register()}>REGISTER</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { updateUser }
  )(Register)
);
