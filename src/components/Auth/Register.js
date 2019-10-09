import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { updateUser } from "../../ducks/reducer";
import Zoom from "react-reveal/Zoom";
import "../../../node_modules/animate.css/animate.css";
import "./Register.css";
import Validate from './Validate';
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
      phoneCheck: false
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

  checkPhone = () => {
    let {phone} = this.state;
    // Check if entered phone is valid.
    const parseNum = phone.match(/^[(]?[0-9]{3}[)]?[ ,-]?[0-9]{3}[ ,-]?[0-9]{4}$/g);
    let newPhone = "";

    // Convert phone into the format needed by Twilio
    if (parseNum) {
      // Give me the digits only, and add a "+1" at the top of the string.
      // This is how Twilio's API expects phone numbers: "+##########""
      newPhone = "+1" + parseNum[0].match(/[\d]/g).join('')

      // Set newPhone to state in the format expected by Twilio.
      this.setState({phone: newPhone, phoneCheck: true})
    } else {
      // alert the user they need to enter a valid number.
      this.setState({phoneCheck: false})
      this.phone.current.value="";
      this.phone.current.focus();
    }
 

  
  }

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
              ref={this.user}
              id="topOf"
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "username")}
              placeholder="username"
            />
            <input
              ref={this.first}
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "firstName")}
              placeholder="First Name"
            />
            <input
              ref={this.last}
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "lastName")}
              placeholder="Last Name"
            />
            <div className="inputValidate">
            <input
              ref={this.phone}
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "phone")}
              placeholder="Phone"
              />
            <Validate data={this.state.phone} phoneCheck={this.state.phoneCheck}/>
              </div>
            <input
              ref={this.email}
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "email")}
              placeholder="Email"
            />
            <input
              ref={this.pass}
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "password")}
              placeholder="Password"
            />
            <input
              ref={this.pass2}
              className="inputSize"
              type="text"
              onChange={e => this.handleChange(e, "password2")}
              placeholder="Re-enter Password"
            />
            <button id="registerButton" onClick={() => this.register()}>REGISTER</button>
            <button onClick={() => this.checkPhone()}>VALIDATE</button>
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
