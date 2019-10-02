import React, {Component} from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { nextTen} from '../../ducks/listReducer'
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
    this.setState({offset: 0})
    this.getPosts()
  }

  getPosts = async () => {
    if (this.state.offset < 10) {
      this.setState({offset: 0})
    }
    const res = await axios.get(`/api/posts?offset=${this.state.offset}`)
    if (res.data) {
      console.log(res.data)
     nextTen(res.data)
    }
  }

  renderList = () => {
    const list = this.props.posts.map((el, index) => {
      console.log(this.props.posts)
      return (
        <div key={index}>
          <p>{el.title}</p>
        </div>
      )
    })
    return list
  }

  render() {
    
    return (
    <div className="Dash">
      {this.renderList()}
      <button onClick={this.getPosts}>GET STUFF</button>
      <button onClick={() => this.setState({offset: this.state.offset += 10})}>Next</button>
      <button onClick={() => this.setState({offset: this.state.offset -= 10})}>Back</button>
    </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.listReducer.posts
  }
}

export default withRouter(connect(mapStateToProps, {nextTen})(Dash))
