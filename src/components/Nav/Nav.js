import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { updateUser, logout } from '../../ducks/reducer'
import { connect } from 'react-redux'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        if (this.props.location.pathname !== '/') { // Only show the account control buttons if logged in. (in other words, if we are on the login screen, don't show these buttons)
            return (
                <div className="Nav">
                    <div className="upperNav">
                        <div id="profile">
                            <div className="profilePic"></div>
                        </div>
                        <div id="navDash">
                            <Link id="navDashTop" to="/dashboard"></Link>
                            <Link to="/new"></Link>
                        </div>
                    </div>
                    <div id="logoutButton">
                        <Link id="logoutButton" to="/"></Link>
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