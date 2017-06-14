import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class Test extends Component{
  sendPOST(e){
    e.preventDefault();
    axios({
    method: 'post',
    url: '/login',
    params: {
      username: 'Bob',
      password: 'PASSWORD12'
      }
    })
    .then(function(response){
      console.log(response);
    });
  }

  clearPOST(e){
    e.preventDefault();
    axios({
      method: 'post',
      url: '/clear'
    });
  }

  showUsers(e){
    e.preventDefault();
    axios({
      method: 'post',
      url: '/show'
    });
  }

  render(){
    return(
      <div className="App">
        <h3> Hello World </h3>
        <br />
        <button onClick={this.sendPOST} > LOGIN EX </button>
        <br />
        <button onClick={this.showUsers} > SHOW </button>
        <br />
        <button onClick={this.clearPOST}> CLEAR </button>
      </div>
    );
  }
}


export default Test;
