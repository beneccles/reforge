import React, { Component } from 'react'
import swal from 'sweetalert2'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import '../../../node_modules/animate.css/animate.css'
import {connect} from 'react-redux'
import './Auth.css'

class Auth extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        username: "",
        password: ""
      }
    }
  
    handleChange = (e, key) => {
      this.setState({
        [key]: e.target.value //Similar to ${}. Targets the passed in key specifically.
      })
    }
  
    register =  () => {
      axios.post('/auth/register', this.state).then(res => {
        this.props.updateUser(res.data.user)
        this.props.history.push('/dashboard')
        swal.fire({type: 'success', text: res.data.message})
      }).catch((err) => {
        console.log(err)
      })
    }
  
  
  
    login = async () => {
      const res = await axios.post('/auth/login', this.state)
      if (res.data.user) {
        const {userId: id, profile_pic: profile, username: name} = res.data.user
        const user = {id, profile, name}
        this.props.updateUser(user)
        this.props.history.push('/dashboard')
        swal.fire({type: 'success', text: res.data.message})
      }
    }
  
  
  
    render() {
      return (
        <div className="authBody">
          <div className="Auth">
            <div id="authLogo" className="animated bounceInDown" >
              {/* <img id="authImg" src={logo} alt="Helo" /> */}
            </div>
            <div className="authRow" id="authUser">
              <pre id="user">Username:</pre>
              <input type="text" onChange={(e) => this.handleChange(e, 'username')} placeholder="username" />
            </div>
            <div className="authRow" id="authPassword">
              <pre id="password">Password:</pre>
              <input type="password" onChange={(e) => this.handleChange(e, 'password')} placeholder="password" />
            </div>
            <div id="authButtons">
              <button onClick={() => this.login()}>Login</button>
              <button onClick={() => this.register()}>Register</button>
            </div>
          </div>
        </div>
      )
    }
  }
  
  export default connect(null, {updateUser})(Auth)