import React, { Component } from 'react'
// eslint-disable-next-line
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { updateUser, logout } from '../../ducks/reducer'
import { connect } from 'react-redux'
import homeImg from '../../assets/home-24px.svg'
import power from '../../assets/power_settings_new-24px.svg'
import post from '../../assets/post_add-24px.svg'
import account from '../../assets/account_circle-24px.svg'
import './Nav.css'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount(){
        if (!this.props.loggedIn) {
            this.props.history.push('/')
        }
    }

    logout = () => {
        axios.delete('/auth/logout').then(() => {
            console.log('SESSION CLOSED')
        })
    }

    render() {
        if (this.props.location.pathname !== '/' && this.props.location.pathname !== '/register') { // Only show the account control buttons if logged in. (in other words, if we are on the login screen, don't show these buttons)
            return (
                <div className="Nav">
                    <div className="upperNav">
                        <div className="select">
                        <Link id="navDashTop" to="/dashboard"><img id="home" className="navImage select" src={homeImg} alt="Home" /></Link>
                        </div>
                        <div className="select">
                        <Link to="/new"><img className="navImage" src={post} alt="New Post" /></Link>
                        </div>
                        <div className="select">
                        <Link id="logoutButton" to="/"><img className="navImage" onClick={this.logout} src={power} alt="Logout" /></Link>
                        </div>
                        <div className="select">
                        <Link to="/account"><img className="navImage" src={account} alt="account" /></Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.reducer.username,
        id: reduxState.reducer.id,
        profile: reduxState.reducer.profile,
        loggedIn: reduxState.reducer.loggedIn
    }
}
// In order for props.match or this.props.location to work, you need to include withRouter
export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav))