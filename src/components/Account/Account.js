import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Account.css'
class Account extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/api/account/posts').then(result => {
            this.setState({
                posts: result.data.map((el, index) => {
                    return (
                        // Create the mini version of the user's post to display.
                        <div id="controlPost">
                            <h1>{el.title}</h1>
                            <p>{el.price}</p>
                            <Link to={{
                                pathname: '/new',
                                state: {
                                    post: el
                                }
                            }}><button>Edit</button></Link>
                            <button onClick={() => this.deletePost(el.post_id, el.author_id)}>Delete</button>
                        </div>
                    )
                })
            })
        })

    }

    deletePost = async (post_id, author_id) => {
        await axios.delete(`/api/post?postId=${post_id}&author_id=${author_id}`)
        this.props.history.push('/')
    }

    render() {

        return (
            <div className="Account">
                <div className="accountBody">
                    <div className="accountDisplay">
                        <h1 id="formTitle">Your Posts</h1>
                        <div className="formLeft arrangeDisplay">
                         {this.state.posts}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.reducer.username,
        id: reduxState.reducer.id,
        loggedIn: reduxState.reducer.loggedIn
    }
}

export default connect(mapStateToProps, {})(Account)