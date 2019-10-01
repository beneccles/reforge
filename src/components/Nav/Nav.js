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
    return (
    <div className="Nav">
      Nav
    </div>
    )
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