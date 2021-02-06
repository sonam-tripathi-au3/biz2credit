import React from 'react';
import axios from "axios"
class Logout extends React.Component {
    componentDidMount(){
        axios.post('http://localhost:8080/api/v1/session/logout')
        .then(res => {console.log(res)})
        .catch((error) => {
          console.log(error);
        })
        window.location.replace("/")
    }
    render(){
        return (
            <div className="container">
            <h4>Logout</h4>
            </div>
          );
    }
}

export default Logout;