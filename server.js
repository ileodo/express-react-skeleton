const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Load config
const config = require('./config/config');


let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// react app main
app.all('/main', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'apps', 'main.html'));
});

// react app second
app.all('/second', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'apps', 'second.html'));
});


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));


app.listen(config.app.port || 3000, function(){
  console.log("Listening on port " + config.app.port);
});
