import React, { Component } from 'react'
// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line
import { withRouter, Link } from 'react-router-dom'
import { nextTen, postReturn } from '../../ducks/listReducer'
import { connect } from 'react-redux'
import './Dash.css'
class Dash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 10
    }
  }

  componentDidMount() {
    this.setState({ offset: 0 })
    this.props.nextTen(this.state.offset)
    this.props.postReturn()
  }

  getPosts = async () => {
    // if (this.state.offset < 10) {
    //   this.setState({offset: 0})
    // }
    // const res = await axios.get(`/api/posts?offset=${this.state.offset}`)
    // if (res.data) {
    //   console.log(res.data)
    //  nextTen(res.data)
    //  this.setState({offset: this.state.offset})
    this.props.nextTen(this.state.offset)
    this.props.postReturn()
    // }
  }

  renderList = () => {
    console.log(this.props)
    const list = this.props.posts.map((el, index) => {
      console.log(el)
      let processor = el.processor.split(" ");
      let pBrand = processor[0];
      let pModel = processor[2];
      let gpu = el.gpu.split(" ");
      let gModel = gpu[1] + gpu[2];

      console.log(processor)
      return (
        <div className="postBoxSmall" key={index}>
          <div className="postHeader">
            <div className="microInfo">
              <p>{pBrand}</p>
              <p>{pModel}</p>
            </div>
           

          </div>
          <div className="postFooter">
                <p>{el.price}</p>
                <p>{gModel}</p>
            </div>
        </div>
      )
    })
    return list
  }

  toggle = () => {
    this.setState({ offset: this.state.offset })
  }

  render() {
    console.log(this.props.posts)

    return (
      <div className="Dash">
        <div className="list">
          {this.renderList()}
        </div>
        <div className="navButtons">
          <button onClick={this.getPosts}>GET STUFF</button>
          {/* I'm certain theres a better way to do this, but for now I will leave it
          as is until after I have the points requirements finished. */}
          {/* eslint-disable-next-line */}
          <button onClick={() => this.setState({ offset: this.state.offset += 10 })}>Next</button>
          {/* eslint-disable-next-line  */}
          <button onClick={() => this.setState({ offset: this.state.offset -= 10 })}>Back</button>
          <button onClick={this.toggle}>REFRESH</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.listReducer.posts
  }
}

export default connect(mapStateToProps, { nextTen, postReturn })(Dash)
