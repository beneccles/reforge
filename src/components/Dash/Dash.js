import React, {Component} from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { nextTen, postReturn} from '../../ducks/listReducer'
import { connect } from 'react-redux'
import store from '../../ducks/store'
import './Dash.css'
class Dash extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      offset: 10
    }
  }

  componentDidMount() {
    this.setState({offset: 0})
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
    console.log(this.props.posts)
    const list = this.props.posts.map((el, index) => {
      console.log(el)
      return (
        <div key={index}>
          <p>{el.title}</p>
        </div>
      )
    })
    return list
  }

  toggle = () => {
    this.setState({offset: this.state.offset})
  }

  render() {
    console.log(this.props.posts)
    
    return (
    <div className="Dash">
      <div>
      {this.renderList()}
      </div>
      <button onClick={this.getPosts}>GET STUFF</button>
      <button onClick={() => this.setState({offset: this.state.offset += 10})}>Next</button>
      <button onClick={() => this.setState({offset: this.state.offset -= 10})}>Back</button>
      <button onClick={this.toggle}>REFRESH</button>
    </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.listReducer.posts
  }
}

export default connect(mapStateToProps, {nextTen, postReturn})(Dash)
