import React, { Component } from 'react'
// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line
import { withRouter, Link } from 'react-router-dom'
import {Swipeable} from 'react-touch'
import { nextTen, postReturn } from '../../ducks/listReducer'
import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade'
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
    if (this.state.offset > 0) {
      let changeOffset = this.state.offset - 10;
      this.setState({offset: changeOffset})
      this.getPosts()
    }
  }


  renderList = () => {
    const list = this.props.posts.map((el, index) => {
      const systemInfo = JSON.parse(el.systeminfo) ;
      return (
        <Fade key={index}>
          <Swipeable onSwipeLeft={this.getNext} onSwipeRight={this.getLast}>
        <Link id="smallPost" to={`/post/${el.post_id}`} key={index}>
          <div className="postBoxSmall" style={{ backgroundImage: `url('${el.url}')` }}>
            <div className="postHeader">
                <div className="microInfo">
                 {systemInfo && <p>{systemInfo.processor.model}</p>}
                </div>
            </div>
            <div className="postFooter">
              <p>{el.price}</p>
              {systemInfo && <p>{systemInfo.graphics[0].model}</p>}
            </div>
          </div>
        </Link>
        </Swipeable>
        </Fade>
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
