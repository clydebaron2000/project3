import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class SignUp extends Component {

    state = {
        email: '',
        password: ''
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        console.log("button was pushed");
        axios.post('http://localhost:5000/api/user', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            console.log(res);
            if(res.data) {
                console.log('Succesful Signup');
                window.location = '/logIn';
            } else {
                console.log('Signup Error');
                alert('Signup Error');
            }
        }).catch(error => {
            console.log('Signup server error: ', error);
        })
    };


    render () { 
        return (
        <div>
          
          <form onSubmit={this.onSubmit}>
          <h3>Sign Up</h3>
            <div className="form-group"> 
              <label>Email: </label>
              <input  type="text"
                  required
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  />
            </div>
            <div className="form-group"> 
              <label>Password: </label>
              <input  type="password"
                  required
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  />
            </div>
    
            <div className="form-group">
              <input type="submit" value="Create Account" className="btn btn-secondary" />
            </div>
          </form>
          <p><Link to="/">Head back to home</Link></p>
        </div>
    );
    }
}
