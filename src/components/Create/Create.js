import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import swal from "sweetalert2";
import { v4 as randomString } from "uuid";
import Fade from "react-reveal/Fade";
import Dropzone from "react-dropzone";
import Spec from '../Spec/Spec';
import "./Create.css";

class Create extends Component {
  constructor() {
    super();

    this.state = {
      // Post
      title: "",
      price: "",
      condition: "",

      // Spec Grab
      isPulling: false,
      systemInfo: {},

      //Edit Post?
      post_id: null,

      //S3
      isUploading: false,
      url: "http://via.placeholder.com/450x450"
    };
  }

  grabSystemSpecs = async () => {
    this.setState({isPulling: true})
    const res = await axios.get('/api/system/specs')
    this.setState({systemInfo: res.data})
  }


  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    // Give each fileName a random string name to ensure unique file names on bucket.
    // Append post title and userId to front, so we can call them back later.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    // Let AWS know to expect a file soon:
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({
          isUploading: false,
          url
        });
      })
      .catch(err => {
        this.setState({
          isUploading: false
        });
        if (err.response.status === 403) {
          alert(`Your request for a signed URL failed with status 403. Double check the CORS and Bucket Policies
                ${err.stack}`);
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  componentDidMount() {
    // If you see a post being passed in from Account, setup for edit mode.
    if (this.props.location.state) {
      console.log(this.props.location.state);
      this.setState({
        condition: this.props.location.state.post.condition,
        post_id: this.props.location.state.post.post_id,
        price: this.props.location.state.post.price,
        title: this.props.location.state.post.title,
        url: this.props.location.state.post.url,
        systemInfo: this.props.location.state.post.systemInfo
      });
    }

    if (!this.props.loggedIn) {
      this.props.history.push("/");
    }
  }

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  handleSubmit = () => {
    const {
      title, price, condition, url, systemInfo
    } = this.state;
    const post = {
      title, price, condition, url, systemInfo
    };
    axios.post("/api/newPost", post)
      .then(res => {
        swal.fire({ type: "success", text: res.data.message });
        this.setState = {
          title: "",
          price: "",
          condition: "",
          url: "",
          systemInfo: {}
        };
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEdit = () => {
    // axios.put('/api/post', {})
    const {
      title, price, condition, url, systemInfo, post_id
    } = this.state;
    const updatedPost = {
      title, price, condition, url, systemInfo
    };
    axios
      .put("/api/post", updatedPost)
      .then(result => {
        swal.fire({ type: "success", text: result.data.message });
        this.props.history.push(`/post/${post_id}`);
      })
      .catch(err => {
        swal.fire({ type: "error", text: err.data.errorMessage });
        console.log("Create, HandleEdit", err);
      });
  };

  render() {
    return (
      <div className="formBody">
        <Fade>
          <div className="Create">
            <div id="formTitle">
              <h1>List a Computer</h1>
            </div>
            <div className="formLeft">
              <input
                id="title"
                value={this.state.title}
                type="text"
                placeholder="Title"
                onChange={e => this.handleChange(e, "title")}
              />
              <select
                value={this.state.price}
                name="price"
                id="priceMenu"
                onChange={e => this.handleChange(e, "price")}
              >
                <option defaultValue="selected">Price...</option>
                <option value="$200">$200</option>
                <option value="$250">$250</option>
                <option value="$300">$300</option>
                <option value="$350">$350</option>
                <option value="$400">$400</option>
                <option value="$450">$450</option>
                <option value="$500">$500</option>
                <option value="$550">$550</option>
                <option value="$600">$600</option>
                <option value="$650">$650</option>
                <option value="$700">$700</option>
                <option value="$750">$750</option>
                <option value="$800">$800</option>
                <option value="$850">$850</option>
                <option value="$900">$900</option>
                <option value="$950">$950</option>
                <option value="$1000">$1000</option>
                <option value="$1100">$1100</option>
                <option value="$1200">$1200</option>
                <option value="$1300">$1300</option>
                <option value="$1400">$1400</option>
                <option value="$1500">$1500</option>
                <option value="$1600">$1600</option>
                <option value="$1700">$1700</option>
                <option value="$1800">$1800</option>
                <option value="$1900">$1900</option>
                <option value="$2000">$2000</option>
                <option value="$2500">$2500</option>
              </select>
              <input
                id="condition"
                value={this.state.condition}
                type="text"
                placeholder="Condition"
                onChange={e => this.handleChange(e, "condition")}
              />
            </div>
            <h2 id="formTitle">Specifications</h2>
            <div className="formLeft">
              {!this.state.isPulling ? <button className="formButton" 
              onClick={this.grabSystemSpecs}>Pull Specs</button> :
              <div className="specs">
                <Spec systemInfo={this.state.systemInfo} />
              </div>}
            </div>
            <h2 id="formTitle">Upload</h2>
            <div id="dropZone">
              <Dropzone onDrop={this.getSignedRequest}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <button>Click me to upload a Image!</button>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
        </Fade>
        <div className="formFooter">
          {/* If post_id is truthy, switch to edit mode. */}
          {this.state.post_id ? (
            <button className="formButton" onClick={this.handleEdit}>
              Save Changes
            </button>
          ) : (
            <button className="formButton" onClick={this.handleSubmit}>
              Submit
            </button>
          )}
          <button className="formButton">Cancel</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    loggedIn: reduxState.reducer.loggedIn,
    id: reduxState.reducer.id
  };
}

export default connect(mapStateToProps)(Create);
