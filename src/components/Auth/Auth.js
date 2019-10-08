import React, { Component } from 'react'
import swal from 'sweetalert2'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { updateUser } from '../../ducks/reducer'
import '../../../node_modules/animate.css/animate.css'
import { connect } from 'react-redux'
import './Auth.scss'

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


    login = async () => {
        const res = await axios.post('/auth/login', this.state)
        console.log("Res", res.data.user)
        if (res.data.user) {
            const { userId: id, profile_pic: profile, username } = res.data.user
            const user = { id, profile, username, loggedIn: true }
            this.props.updateUser(user)
            this.props.history.push('/dashboard')
            swal.fire({ type: 'success', text: res.data.message })
        }
    }



    render() {
        return (
            <div className="authBody">
                 <div id="authLogo" className="animated fadeInDown" >
                        <h1 id="logoTitle">REFORGED COMPUTERS</h1>
                    </div>
                <div className="Auth shadow-slow">
                    <div className="authRow" id="authUser">
                        <pre id="user">USERNAME:</pre>
                        <input id="userInput" type="text" onChange={(e) => this.handleChange(e, 'username')} placeholder="username" />
                    </div>
                    <div className="authRow" id="authPassword">
                        <div className="centerOnInput">
                        <pre id="password">PASSWORD:</pre>
                        </div>
                        <input id="passwordInput" type="password" onChange={(e) => this.handleChange(e, 'password')} placeholder="password" />
                    </div>
                    <div id="authButtons">
                        <button id="login" onClick={() => this.login()}>LOGIN</button>
                        <button id="register" onClick={() => {
                            this.props.history.push('/register')
                        }}>REGISTER</button>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(connect(null, { updateUser })(Auth))