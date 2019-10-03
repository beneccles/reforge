import React, { Component } from 'react'
// eslint-disable-next-line
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { updateUser, logout } from '../../ducks/reducer'
import { connect } from 'react-redux'
import homeImg from '../../assets/home-24px.svg'
import power from '../../assets/power_settings_new-24px.svg'
import post from '../../assets/post_add-24px.svg'
import './Nav.css'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        if (this.props.location.pathname !== '/' && this.props.location.pathname !== '/register') { // Only show the account control buttons if logged in. (in other words, if we are on the login screen, don't show these buttons)
            return (
                <div className="Nav">
                    <p>{this.props.username}</p>
                    <div className="upperNav">
                        <Link id="navDashTop" to="/dashboard"><img className="navImage" src={homeImg} alt="Home" /></Link>
                        <Link to="/new"><img className="navImage" src={post} alt="New Post" /></Link>
                        <Link id="logoutButton" to="/"><img className="navImage" src={power} alt="Logout" /></Link>
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
        username: reduxState.username,
        id: reduxState.id,
        profile: reduxState.profile
    }
}
// In order for props.match or this.props.location to work, you need to include withRouter
export default withRouter(connect(mapStateToProps, { updateUser, logout })(Nav))