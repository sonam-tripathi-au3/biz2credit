import React, { Component } from "react";
import axios from"axios"
import { FormErrors } from './formerrors';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          formErrors: {email: '', password: ''},
          emailValid: false,
          passwordValid: false,
          formValid: false
        }
      }
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 8;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
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
              email: this.state.email,
              password: this.state.password
            };
            console.log(user)
            axios.post('http://localhost:8080/api/v1/login', user)
              .then(res => console.log(res.data));
        
            this.setState({  email: '', password: '' })
            window.location.replace("/users")
          }
  render() {
      const stye={
          height:"350px",
          width:"300px"
      }
    return (
        <div class="container d-flex justify-content-center align-items-center"style={{height:"100vh"}}>
        <div class="card "style={stye}>
        <div class= "card-body ">
        <form onSubmit={this.onSubmit} > 
        <h4 class="text-center">Login</h4>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div class={`form-group ${this.errorClass(this.state.formErrors.email)}`} >
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" name="email" value={this.state.email} id="email" onChange={this.handleUserInput} placeholder="Enter email"/>     
        </div>      
        <div class={`form-group ${this.errorClass(this.state.formErrors.password)}`}> 
        <label for="password">Password</label>
            <input type="password" class="form-control" name="password" id="password" value={this.state.password} onChange={this.handleUserInput} placeholder="Password"/>
        </div>      
        <button class="btn btn-primary" value="login" disabled={!this.state.formValid}>Login</button>
        <p className="text-center mt-3"> New user? <Link to='/signup'>Signup</Link> here</p>
        </form>    
        </div>
        </div> 
        </div> 
    );
  }
}