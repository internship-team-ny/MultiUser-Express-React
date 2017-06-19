// server/app.js

//other modules
var users = require('./users')

//npm modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get(['/','/hashtag','/test'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// req.query contains the JSON from the client
app.post('/login',(req,res) =>{
  users.login(req.query, res);
});

//CHECKING COOKIE INFO TO SEE IF LOGIN INFO AND SESION ARE ALL VALID
app.post('/checkSession',(req,res) =>{
  users.checkSession(req.query, res);
})

//METHODS BELOW JUST FOR TESTING PURPOSES

//TO CLEAR THE USERS COLLECTION IN MONGODB
app.post('/clear',(req,res) =>{
  users.clear();
})

//TO DUMP ALL THE ENTRIES IN THE USERS COLLECTION IN MONGODB
app.post('/show',(req,res) =>{
  users.show();
})

module.exports = app;
