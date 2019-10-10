import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { updateUser } from "../../ducks/reducer";
import "../../../node_modules/animate.css/animate.css";
import "./Register.css";
import Validate from "./Validate";
import Fade from "react-reveal/Fade";
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
      password: "",
      password2: "",

      // Validation Checks
      userCheck: false,
      phoneCheck: false,
      passCheck: false,
      pass2Check: false
    };

    this.user = React.createRef();
    this.first = React.createRef();
    this.last = React.createRef();
    this.phone = React.createRef();
    this.email = React.createRef();
    this.pass = React.createRef();
    this.pass2 = React.createRef();
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value //Similar to ${}. Targets the passed in key specifically.
    });
  };

  checkPassword = () => {
    let { password, password2 } = this.state;

    if (password === password2) {
      this.setState({
        passCheck: true,
        pass2Check: true
      });
    } else if (password2 !== password) {
      this.setState({
        passCheck: true,
        pass2Check: false
      });
    } else {
      this.setState({
        passCheck: false,
        pass2Check: false
      });
    }
  };

  checkPhone = () => {
    let { phone } = this.state;
    // Check if entered phone is valid.
    const parseNum = phone.match(
      /^[(]?[0-9]{3}[)]?[ ,-]?[0-9]{3}[ ,-]?[0-9]{4}$/g
    );
    let newPhone = "";

    // Convert phone into the format needed by Twilio
    if (parseNum) {
      // Give me the digits only, and add a "+1" at the top of the string.
      // This is how Twilio's API expects phone numbers: "+##########""
      newPhone = "+1" + parseNum[0].match(/[\d]/g).join("");

      // Set newPhone to state in the format expected by Twilio.
      this.setState({ phone: newPhone, phoneCheck: true });
    } else {
      // alert the user they need to enter a valid number.
      this.setState({ phoneCheck: false });
      this.phone.current.value = "";
      this.phone.current.focus();
    }
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
          <Fade>
            <div>
              <div className="tagline">
                <h1>REFORGED MACHINES</h1>
              </div>
            </div>
          </Fade>
          <Fade>
            <div className="registerBox">
              <h1 id="registerTitle">CREATE ACCOUNT:</h1>
              <div className="inputValidate">
                <input
                  ref={this.user}
                  id="topOf"
                  className="inputSize"
                  type="text"
                  onChange={e => this.handleChange(e, "username")}
                  placeholder="username"
                />
                <Validate data={this.state.username} itemCheck={true} />
              </div>
              <div className="inputValidate">
                <input
                  ref={this.first}
                  className="inputSize"
                  type="text"
                  onChange={e => this.handleChange(e, "firstName")}
                  placeholder="First Name"
                />
                <Validate data={this.state.firstName} itemCheck={true} />
              </div>
              <div className="inputValidate">
                <input
                  ref={this.last}
                  className="inputSize"
                  type="text"
                  onChange={e => this.handleChange(e, "lastName")}
                  placeholder="Last Name"
                />
                <Validate data={this.state.lastName} itemCheck={true} />
              </div>
              <div className="inputValidate">
                <input
                  ref={this.phone}
                  className="inputSize"
                  type="text"
                  onChange={e => this.handleChange(e, "phone")}
                  placeholder="Phone"
                />
                <Validate
                  data={this.state.phone}
                  itemCheck={this.state.phoneCheck}
                />
              </div>
              <div className="inputValidate">
                <input
                  ref={this.email}
                  className="inputSize"
                  type="text"
                  onChange={e => this.handleChange(e, "email")}
                  placeholder="Email"
                />
                <Validate data={this.state.email} itemCheck={true} />
              </div>
              <div className="inputValidate">
                <input
                  ref={this.pass}
                  className="inputSize"
                  type="text"
                  onChange={e => {
                    this.handleChange(e, "password");
                  }}
                  placeholder="Password"
                />
                <Validate data={this.state.password} itemCheck={true} />
              </div>
              <div className="inputValidate">
                <input
                  ref={this.pass2}
                  className="inputSize"
                  type="text"
                  onChange={e => {
                    this.handleChange(e, "password2");
                  }}
                  placeholder="Re-enter Password"
                />
                <Validate data={this.state.password2} itemCheck={true} />
              </div>
              <button id="registerButton" onClick={() => this.register()}>
                REGISTER
              </button>
            </div>
          </Fade>
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
