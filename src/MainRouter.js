import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './core/Menu'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import Users from './user/Users'
import PrivateRoute from './auth/PrivateRoute'
import UpdateProfile from './user/UpdateProfile'
import FindPeople from './user/FindPeople'
import NewPost from './post/NewPost'
import Post from './post/Post'
import EditPost from './post/EditPost'

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/post/:postId" component={Post} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/edit/:userId" component={UpdateProfile} />
            

        </Switch>
    </div>
);

export default MainRouter
