import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import swal from "sweetalert2";
import { v4 as randomString } from "uuid";
import Zoom from "react-reveal/Fade";
import Dropzone from "react-dropzone";
import Spec from "../Spec/Spec";
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
      systemInfo: {
        make: "",
        model: "",
        serial: "",
        sku: "",
        processor: {
          make: "",
          model: "",
          vendor: "",
          cores: null
        },
        memory: [],
        battery: {},
        disks: [],
        graphics: []
      },

      //Edit Post?
      post_id: null,

      //S3
      isUploading: false,
      url: "",

    };

    this.uploadFile = this.uploadFile.bind(this);
  }

  // This is really cool. I'm using a package called systemInformation
  // to grab the user's specs directly from their machine. The user doesn't have to do anything
  // expect click a button to initate the process. Check out /server/controllers/sysController.js
  // if you would like to see how it works! Unfortunately, since the package uses node to grab the
  // computer's specs, it only works if both the frontend and server are running on the same
  grabSystemSpecs = async () => {
    this.setState({ isPulling: true });
    const res = await axios.get("/api/system/specs");
    const result = await axios.get("/api/system/mock");
    if (!res.data.make.match('DigitalOcean')) {
      this.setState({ systemInfo: res.data });
    } else {
      // If we don't have access to the client's specs,
      // lets load up some dummy specs for the demo.
      this.setState({ systemInfo: result.data.systemInfo });
    }
  };

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
        console.log(response.data.url);
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile(file, signedRequest, url) {
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
        if (err.status === 403) {
          alert(`Your request for a signed URL failed with status 403. Double check the CORS and Bucket Policies
                ${err.stack}`);
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  }

  componentDidMount() {
    // If you see a post being passed in from Account, setup for edit mode.
    if (this.props.location.state) {
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
    const { title, price, condition, url, systemInfo } = this.state;
    const { id } = this.props;
    const post = {
      title,
      price,
      condition,
      url,
      systemInfo,
      id
    };
    axios
      .post("/api/newPost", post)
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
    const { title, price, condition, url, systemInfo, post_id } = this.state;
    const updatedPost = {
      title,
      price,
      condition,
      url,
      systemInfo,
      post_id
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
        <Zoom left>
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
              {!this.state.isPulling ? (
                <button className="formButton" onClick={this.grabSystemSpecs}>
                  Pull Specs
                </button>
              ) : (
                <div className="specs">
                  {/* If running on the server, load the demo specs, since
                systemInformation doesn't currently work unless we are running locally on the user's
                computer. */}
                  {/* Load specs for review */}
                  
                  <Spec
                    systemInfo={this.state.systemInfo}
                    handleChange={this.handleChange}
                  />
                </div>
              )}
            </div>
            <h2 id="formTitle">Upload</h2>
            <div id="dropZone">
              {this.state.url ? (
                <div
                  id="previewImage"
                  style={{ backgroundImage: `url('${this.state.url}')` }}
                ></div>
              ) : (
                <Dropzone onDrop={this.getSignedRequest}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button className="formButton">
                        Click me to upload a Image!
                      </button>
                    </div>
                  )}
                </Dropzone>
              )}
            </div>
          </div>
        </Zoom>
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
