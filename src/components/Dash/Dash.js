import React, { Component } from 'react'
// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line
import { withRouter, Link } from 'react-router-dom'
import {Swipeable} from 'react-touch'
import { nextTen, postReturn } from '../../ducks/listReducer'
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom'
import './Dash.css'
class Dash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: 0
    }
  }

  componentDidMount() {

    if (!this.props.loggedIn) {
      this.props.history.push("/")
    }

    this.props.nextTen(this.state.offset)
    this.props.postReturn()
  }

  getPosts = async () => {
    this.props.nextTen(this.state.offset)
    this.props.postReturn()
  }

  getNext = () => {
    let changeOffset = this.state.offset + 10;
    this.setState({offset: changeOffset})
    this.getPosts()
  }

  getLast = () => {
    let changeOffset = this.state.offset - 10;
    this.setState({offset: changeOffset})
    this.getPosts()
  }


  renderList = () => {
    const list = this.props.posts.map((el, index) => {
      let processor = el.processor.split(" ");
      let pBrand = processor[0];
      let pModel = processor[2];
      let gpu = el.gpu.split(" ");
      let gModel = gpu[1] + " " + gpu[2];
      return (
        <Zoom>
          <Swipeable onSwipeLeft={this.getNext} onSwipeRight={this.getLast}>
        <Link id="smallPost" to={`/post/${el.post_id}`} key={index}>
          <div className="postBoxSmall" style={{ backgroundImage: `url('${el.url}')` }}>
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
        </Link>
        </Swipeable>
        </Zoom>
      )
    })
    return list
  }

  toggle = () => {
    this.setState({ offset: this.state.offset })
  }

  render() {

    return (
      <div className="Dash">
        <div className="list">
             {this.renderList()}
        </div>
        <div className="navButtons">
          {/* <button onClick={this.getPosts}>GET STUFF</button> */}
          {/* I'm certain theres a better way to do this, but for now I will leave it
          as is until after I have the points requirements finished. */}
          {/* eslint-disable-next-line */}
          {/* <button onClick={() => this.setState({ offset: this.state.offset += 10 })}>Next</button>
          {/* eslint-disable-next-line  */}
          {/* <button onClick={() => this.setState({ offset: this.state.offset -= 10 })}>Back</button>
          <button onClick={this.toggle}>REFRESH</button> */}
        </div>
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.listReducer.posts,
    loggedIn: reduxState.reducer.loggedIn
  }
}

export default connect(mapStateToProps, { nextTen, postReturn })(Dash)
