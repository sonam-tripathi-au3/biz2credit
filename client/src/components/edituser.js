import React, { Component } from "react";
import axios from 'axios';



export default class Edituser extends Component {
    constructor (props) {
      super(props);
      this.state = {
        name:"",
        email: '',
        phone_number:"",
      }
    }
    componentDidMount() {
      axios.get(`http://localhost:8080/api/v1/users/${ this.props.match.params.id}`)
        .then(res => {
          this.setState({
            name: res.data.name,
            email: res.data.email,
            phone_number: res.data.phone_number
          });
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
    }
  
      onSubmit=(e)=> {
          e.preventDefault()
          const user = {
            name: this.state.name,
            email: this.state.email,
            phone_number: this.state.phone_number,
          };
          console.log(user)
          axios.put(`http://localhost:8080/api/v1/users/${this.props.match.params.id}`, user)
          .then((res) => {
            console.log(res.data)
            console.log('Student successfully updated')
          }).catch((error) => {
            console.log(error)
          })
    
        window.location.replace('/users')
        }
render() {
    const stye={
        height:"500px",
        width:"400px"
    }
  return (
      <div class="container d-flex justify-content-center align-items-center"style={{height:"100vh"}}>
      <div class="card "style={stye}>
      <div class= "card-body ">
      <form onSubmit={this.onSubmit} > 
      <h4 class="text-center">Edit user</h4>
      <div class={`form-group `} >
      <label for="text">Name</label>
      <input type="text" class="form-control" name="name" value={this.state.name} id="name" onChange={this.handleUserInput} placeholder="Enter name"/>     
      </div>
      <div class={`form-group `} >
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" name="email" value={this.state.email} id="email" onChange={this.handleUserInput} placeholder="Enter email"/>     
      </div> 
      <div class={`form-group `} >
      <label for="number">Phone Number</label>
      <input type="number" class="form-control" name="phone_number" value={this.state.phone_number} id="phone_number" onChange={this.handleUserInput} placeholder="Enter number"/>     
      </div>     
      <button class="btn btn-primary" value="signup" >Update</button>
      </form>    
      </div>
      </div> 
      </div> 
  );
}
}
