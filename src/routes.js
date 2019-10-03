import {Switch, Route} from 'react-router-dom';
import React from 'react';
import Auth from './components/Auth/Auth';
import Register from './components/Auth/Register';
import Dash from './components/Dash/Dash';
import Post from './components/Post/Post';
import Create from './components/Create/Create'

export default (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dash} />
        <Route path="/post/:postId" component={Post} />
        <Route path='/new' component={Create} />
    </Switch>
)