import React, {Component} from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import { updateUser } from '../../ducks/reducer'
import '../../../node_modules/animate.css/animate.css'
import { connect } from 'react-redux'

class Register extends Component {
  constructor() {
    super() 
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: ""
    }
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value //Similar to ${}. Targets the passed in key specifically.
    })
  }

  register = () => {
    axios.post('/auth/register', this.state).then(res => {
        this.props.history.push('/dashboard')
        swal.fire({ type: 'success', text: res.data.message })
    }).catch((err) => {
        console.log(err)
    })
}

  render() {
    return (
      <>
    <div className="Register">
       <input type="text" onChange={(e) => this.handleChange(e, 'username')} placeholder="username" />
       <input type="text" onChange={(e) => this.handleChange(e, 'firstName')} placeholder="First Name" />
       <input type="text" onChange={(e) => this.handleChange(e, 'lastName')} placeholder="Last Name" />
       <input type="text" onChange={(e) => this.handleChange(e, 'phone')} placeholder="Phone" />
       <input type="text" onChange={(e) => this.handleChange(e, 'email')} placeholder="Email" />
       <input type="text" onChange={(e) => this.handleChange(e, 'password')} placeholder="Passwor" />
       <button onClick={() => this.register()}>Register</button>
    </div>
    </>
    )
  }
}

export default withRouter(connect(null, { updateUser })(Register))