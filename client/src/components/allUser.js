import React, { Component } from "react";
import {Link} from 'react-router-dom';
import UserList from "./Userlist";


export default class AllUser extends Component {
  render() {
    return (
      <div class="container">
      <h5 class="text-center mt-5 mb-2">Home Page</h5>
      <div class="form-group row">
      <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="List of Users"/>
      </div>
      <button type="submit" class="btn btn-primary mb-2 col-sm-2 col-form-label"><Link to="/create_user">Create New User</Link></button>
      </div>
      <UserList/>
      </div>
    );
  }
}