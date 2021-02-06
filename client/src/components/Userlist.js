import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

export default class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
          users: []
        };
      }
    
    componentDidMount(){
        console.log("hello")
        axios.get('http://localhost:8080/api/v1/users')
        .then(res => {
            this.setState({
            users: res.data
          })
        })
    }


    deleteStudent(id){
        axios.delete('http://localhost:8080/api/v1/users' + id)
            .then((res) => {
                console.log(res.data)
                console.log('Student successfully deleted!')
            })
    }
    render() {
        return (
            <div class="container">
                {
                this.state.users.length>0 ?  
                <div class="card-deck">
                {this.state.users.map((item,index)=>
                    <div class="card"key={index}>
                    <div class="card-body">
                    <p class="card-text">Name: {item.name}</p>
                    <p class="card-text">Email: {item.email}</p>
                    <p class="card-text">Phone: {item.phone_number}</p>
                    <a><Link className="edit-link" to={"/users/" + item._id}>
                        Edit
                    </Link></a>
                    <button onClick={this.deleteStudent(item._id)} size="sm" variant="danger">Delete</button>
                    </div>
                    </div>   
                )}
                </div>
                :
                <p className="m-5">Data loading..</p>
                }
            </div> 
        );
    }
}