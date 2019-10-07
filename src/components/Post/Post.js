import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import './Post.css'

class Post extends Component {
    state = {
        post: {}
    }

    componentDidMount(){
        this.singlePost()
    }

    singlePost = async () => {
        const { postId } = this.props.match.params;
        const res = await axios.get(`/api/post?id=${postId}`)
        this.setState({ post: res.data[0] })
    }

    sendSMS = () => {
        const {author_id, title, price} = this.state.post
        const message = title + ' for ' + price 
        axios.post('/api/sendSMS', {name: 'Ben', message})
    }

    render() {
        const { post } = this.state
        const { id } = this.props;
        const {author_id} = post;
        return (
            <div className="postBody">
                <div className="post">
                    <div id="postTitle" className="formLeft">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="postImages" style={{ backgroundImage: `url('${post.url}')`}}>
                        <div className="heroImage" style={{ backgroundImage: `url('${post.url}')`}}>
                            <div className="postPrice">
                                 <p>{post.price}</p>
                            </div>
                        </div>
                    </div>
                    <div id="postTitle" className="formLeft">
                        <h1>Specifications</h1>
                    </div>
                    <div className="formLeft specs">
                        <p>{`Processor: ${post.processor}`}</p>
                        <p>{`Graphics Card: ${post.gpu}`}</p>
                        <p>{`Primary Storage: ${post.storage_prime}`}</p>
                        <p>{`Secondary Storage: ${post.storage_2nd}`}</p>
                    </div>
                    <div className="condition">
                        <p>{`" ${post.condition}"`}</p>
                    </div>
                    <div id="postTitle" className="formLeft">
                        <h1>Contact Seller</h1>
                    </div>
                    <div className="formLeft">
                        <button onClick={this.sendSMS}>Send Message</button>
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