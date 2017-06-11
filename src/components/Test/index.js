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

  render(){
    return(
      <div className="App">
        <h3> Hello World </h3>
        <br />
        <button onClick={this.sendPOST} > BUTTON </button>
      </div>
    );
  }
}


export default Test;
