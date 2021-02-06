import React from 'react';
import AllUser from './allUser';
import Login from  './login';
import Signup from "./register";
import CreateUser from"./createuser";
import Edit from "./edituser";
import Logout from "./logout";
import {Route, Switch,BrowserRouter as Router, Redirect} from 'react-router-dom'

function APP () {
    return(
        <div>
            <Router>
             <Switch>
             <Route exact path="/" component={Login} />
             <Route exact path="/signup" component={Signup} />
             <Route path='/users' component={AllUser} ></Route>
             <Route path='/create_user' component={CreateUser} ></Route>
             <Route path="/users/:id" component={Edit}></Route>
             <Route path="/users/logout" component={Logout}></Route>
             </Switch>
            </Router>
        </div>
    )
}
export default APP
