import React, { Component } from 'react';
import cookie from 'react-cookies'
import axios from 'axios';
import $ from 'jquery';
import './style.css';
import './style.js';

class Test extends Component{
  loginUser(e){
    e.preventDefault();
    var username = $('#username').val()
    var password = $('#password').val()
    if((username == '') || (password == '')){
      return;
    }

    var self = this;
    axios({
    method: 'post',
    url: '/login',
    params: {
      username: username,
      password: password,
      }
    })
    .then(function(response){
      console.log(response.data);
      if(response.data.success){
        cookie.save('username', username)
        cookie.save('password', password)
        cookie.save('session', response.data.session)
        window.location = "/hashtag"
      }
    });
  }

  componentWillMount(){
    var username = cookie.load('username')
    var password = cookie.load('password')
    var session = cookie.load('session')
    console.log(username, ' ', password, ' ', session)
    if(username == null || password == null || session == null){
      return;
    }
    axios({
    method: 'post',
    url: '/checkSession',
    params: {
      username: username,
      password: password,
      session: session,
      }
    })
    .then(function(response){
      console.log(response.data);
      if(response.data.success){
        window.location = "/hashtag"
      }
    });
  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
      <hgroup>
        <h1>Login Form</h1>
      </hgroup>
      <form>
        <div className="group">
          <input type="text" id="username" /><span className="highlight"></span><span className="bar"></span>
          <label>Username</label>
        </div>
        <div className="group">
          <input type="password" id="password" /><span className="highlight"></span><span className="bar"></span>
          <label>Password</label>
        </div>
        <button type="button" className="button buttonBlue" onClick={this.loginUser}>
          Login
          <div className="ripples buttonRipples"><span className="ripplesCircle"></span></div>
        </button>
      </form>
      <footer><a href="http://www.polymer-project.org/" target="_blank"><img src="https://www.polymer-project.org/images/logos/p-logo.svg" /></a>
        <p><a href="http://www.polymer-project.org/" target="_blank">Google</a></p>
      </footer>
      </div>
    );
  }
}


export default Test;
