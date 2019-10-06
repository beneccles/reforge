import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Account extends Component {

    state = {
        posts: []
    }

    getMyPosts = async () => {
        const myPosts = await axios.get('/api/account/posts')

        // Tested Oct-6, confirmed via console log that
        // myPosts is being recieved into front end from 
        // server and DB.
        if (myPosts) {
            this.setState({posts: myPosts})
        } else {
            // Show message welcoming the user to the app,
            // and whether or not they would like to create a new
            // post.
        }
    }
    render() {
        return (
            <div className="Account">
                <br />
                <br />
                <br />
                <br />
                <br />
                <button onClick={this.getMyPosts}>Get Posts</button>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
      id: reduxState.reducer.id,
      loggedIn: reduxState.reducer.loggedIn
    }
  }
  
  export default connect(mapStateToProps, {})(Account)