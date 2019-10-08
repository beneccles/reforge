import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './Post.css'

class Post extends Component {
    state = {
        post: {},
        name: "",
        number: ""
    }

    componentDidMount() {
        this.singlePost()
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    singlePost = async () => {
        const { postId } = this.props.match.params;
        const res = await axios.get(`/api/post?id=${postId}`)
        this.setState({ post: res.data[0] })
    }

    sendCall = async () => {
        const {title, price} = this.state.post;
        const {name, number} = this.state;

        await axios.post('/api/call', {title, price, name, number})
    }

    sendSMS = () => {
        const { author_id, title, price } = this.state.post
        const message = title + ' for ' + price
        axios.post('/api/sendSMS', { name: 'Ben', message })
    }

    render() {
        const { post } = this.state
        const { id } = this.props;
        const { author_id } = post;
        return (
            <div className="postBody">
                <div className="post">
                    <div id="postTitle" className="formLeft">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="postImages" style={{ backgroundImage: `url('${post.url}')` }}>
                        <div className="postPrice">
                            <p>{post.price}</p>
                        </div>
                    </div>
                    <div id="postTitle" className="formLeft">
                        <h1>Specifications</h1>
                    </div>
                    <div className="formLeft specs">
                        <strong>{`${post.condition}  -   ${post.price}`}</strong>
                        <p>{`Processor: ${post.processor}`}</p>
                        <p>{`Graphics Card: ${post.gpu}`}</p>
                        <p>{`Primary Storage: ${post.storage_prime}`}</p>
                        <p>{`Secondary Storage: ${post.storage_2nd}`}</p>

                    </div>
                    <div id="postTitle" className="formLeft">
                        <h1>Contact Seller</h1>
                    </div>
                    <div className="formLeft">
                        <input type="text" onChange={(e) => this.handleChange(e, 'name')} placeholder="Name?" />
                        <input type="text" onChange={(e) => this.handleChange(e, 'number')}placeholder="Number?" />

                        <button onClick={this.sendCall}>Call Me</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
        posts: reduxState.listReducer.posts,
        id: reduxState.reducer.id
    }
}

export default connect(mapStateToProps, {})(Post)