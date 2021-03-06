import React, { Component } from "react";
import axios from "axios";
import Zoom from "react-reveal/Fade";
import Spec from '../Spec/Spec'
import { connect } from "react-redux";
import "./Post.css";

class Post extends Component {
  state = {
    post: {},
    name: "",
    number: "",
    systemInfo: null
  };

  componentDidMount() {
    this.singlePost();
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  singlePost = async () => {
    const { postId } = this.props.match.params;
    const res = await axios.get(`/api/post?id=${postId}`);
    const sysInfo = JSON.parse(res.data[0].systeminfo)
    this.setState({ post: res.data[0], systemInfo: sysInfo });
  };

  sendCall = async () => {
    const { title, price, author_id } = this.state.post;
    const { name, number } = this.state;

    await axios.post("/api/call", { title, price, name, number, author_id });
  };

  sendSMS = () => {
    const { title, price } = this.state.post;
    const message = title + " for " + price;
    axios.post("/api/sendSMS", { name: this.state.name, message });
  };

  render() {
    const { post } = this.state;
    return (
      <Zoom left>
        <div className="postBody">
          <div className="post">
            <div id="postTitle" className="formLeft">
              <h1>{post.title}</h1>
            </div>
            <div
              className="postImages"
              style={{ backgroundImage: `url('${post.url}')` }}
            ></div>
            <div id="postTitle" className="formLeft">
              <h1>Specifications</h1>
            </div>
            <div className="formLeft specs">
              <strong>{`${post.condition}  -   ${post.price}`}</strong>
              {this.state.systemInfo && <Spec systemInfo={this.state.systemInfo} />}
            </div>
            <div id="postTitle" className="formLeft">
              <h1>Contact Seller</h1>
            </div>
            <div className="formLeft">
              <input
                type="text"
                onChange={e => this.handleChange(e, "name")}
                placeholder="Name?"
              />
              <input
                type="text"
                onChange={e => this.handleChange(e, "number")}
                placeholder="Number?"
              />

              <button onClick={this.sendCall}>Call Me</button>
            </div>
          </div>
        </div>
      </Zoom>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.listReducer.posts,
    id: reduxState.reducer.id
  };
}

export default connect(
  mapStateToProps,
  {}
)(Post);
