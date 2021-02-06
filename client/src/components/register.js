import React, { Component } from "react";
import axios from"axios"
import { FormErrors } from './formerrors';
import {Link} from 'react-router-dom';

export default class Signup extends Component {
    constructor (props) {
        super(props);
        this.state = {
          name:"",
          email: '',
          phone_number:"",
          password: '',
          formErrors: {name:"", email: '',phone_number:"" ,password: ''},
          nameValid:false,
          emailValid: false,
          phonenumberValid:false,
          passwordValid: false,
          formValid: false
        }
      }
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid=this.state.nameValid;
        let emailValid = this.state.emailValid;
        let phonenumberValid=this.state.phonenumberValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
          case  "name":
              nameValid= value.length >2 && value.length<20
              fieldValidationErrors.name=nameValid?"":"enter more than 2 but less than 20"
              break;
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 8;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          case "phone_number":
          phonenumberValid=!value.length<10 && !value.length>10
            fieldValidationErrors.phonenumber= phonenumberValid ? "": "ENTER 10 DIGIT NUMBER"
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }
    
      handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }
    
        onSubmit=(e)=> {
            e.preventDefault()
            const user = {
              name: this.state.name,
              email: this.state.email,
              phone_number: this.state.phone_number,
              password: this.state.password
            };
            console.log(user)
            axios.post('http://localhost:8080/api/v1/signup', user)
              .then(res => console.log(res.data));
        
            this.setState({  name: '', email: '',phone_number:'', password: '' })
            window.location.replace("/")
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
        <h4 class="text-center">User Registration</h4>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div class={`form-group ${this.errorClass(this.state.formErrors.name)}`} >
        <label for="text">Name</label>
        <input type="text" class="form-control" name="name" value={this.state.name} id="name" onChange={this.handleUserInput} placeholder="Enter name"/>     
        </div>
        <div class={`form-group ${this.errorClass(this.state.formErrors.email)}`} >
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" name="email" value={this.state.email} id="email" onChange={this.handleUserInput} placeholder="Enter email"/>     
        </div> 
        <div class={`form-group ${this.errorClass(this.state.formErrors.phone_number)}`} >
        <label for="number">Phone Number</label>
        <input type="number" class="form-control" name="phone_number" value={this.state.phone_number} id="phone_number" onChange={this.handleUserInput} placeholder="Enter number"/>     
        </div>     
        <div class={`form-group ${this.errorClass(this.state.formErrors.password)}`}> 
        <label for="password">Password</label>
            <input type="password" class="form-control" name="password" id="password" value={this.state.password} onChange={this.handleUserInput} placeholder="Password"/>
        </div>      
        <button class="btn btn-primary" value="signup" disabled={!this.state.formValid}>Register</button>
        <p className="text-center mt-3"> Already have an account? <Link to='/'>Login</Link> here</p>
        </form>    
        </div>
        </div> 
        </div> 
    );
  }
}