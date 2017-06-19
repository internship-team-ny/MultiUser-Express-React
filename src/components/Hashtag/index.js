import React, { Component } from 'react';
import cookie from 'react-cookies'
import axios from 'axios';
import $ from 'jquery';
import './style.css';

class Hashtag extends Component{

  handleChange(e){
    e.preventDefault();
  }

  handleSubmit(e){
    e.preventDefault();
    var hashtag = $('#hashtag').val();
    console.log(hashtag)
  }

  //BEFORE MOUNTING COMPONENT CHECK COOKIE CONTENTS AND SEND IT UP TO server
  componentWillMount(){
    var username = cookie.load('username')
    var password = cookie.load('password')
    var session = cookie.load('session')
    console.log(username, ' ', password, ' ', session)
    //COOKIE IS NON-EXISTENT OR SOMETHING, THEN GO BACK TO LOGIN PAGE
    if(username == null || password == null || session == null){
      window.location = "/"
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
      if(!response.data.success){
        window.location = "/"
      }
    });
  }

  componentDidMount(){

  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <h5>Input Hashtag </h5>
			  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
			    <input className="mdl-textfield__input" type="text" id="hashtag" onChange={this.handleChange}/>
			    <label className="mdl-textfield__label" htmlFor="hashtag">Hashtag</label>
			  </div>
			</form>
    );
  }
}


export default Hashtag;
