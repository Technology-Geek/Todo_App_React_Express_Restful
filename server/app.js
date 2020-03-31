/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');
//MongoDB ODM
const mongoose = require('mongoose');
//HTTP Logger
const morgan = require('morgan');
//Terminal Styler
const chalk = require('chalk');
//Configuration Keys
const { mongo, httpPort } = require('./configuration/config');
//Route
const todoRoute = require('./app/Todo/todoRoute');
//Request Error Handler
const errorHandler = require('./utils/error/errorHandler');

/***************************
 * @InitializeDependencies *
 ***************************/

//Initialize Express App
const app = express();

//serve static website files
app.use(express.static('../client/build'));

/***************
 * @Middleware *
 ***************/

//Json Body Parser
app.use(express.json());

//Request Logger
app.use(
  morgan(function(tokens, req, res) {
    return [
      //TimeStamp
      chalk.magenta(tokens.date(req, res, 'iso')),
      //HTTP Method
      chalk.greenBright.bold(tokens.method(req, res)),
      //Remote IP Address
      chalk.cyanBright.bold(tokens['remote-addr'](req, res)),
      //Request URL
      chalk.whiteBright(tokens.url(req, res)),
      //Response Status Code
      res.statusCode >= 400
        ? chalk.red.bold(tokens.status(req, res))
        : chalk.yellow.bold(tokens.status(req, res)),
      //Response Time
      chalk.magentaBright(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
  })
);

/***********
 * @Routes *
 ***********/

//Book Route
app.use('/todo', todoRoute);

/***************
 * @Middleware *
 ***************/

//Not Found Handler
app.use((req, res) => {
  //! Request Error Handler Code 404
  errorHandler(res, 404);
});

//MongoDB Connection
mongoose
  .connect(mongo.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    //DB Name
    dbName: mongo.dbName,
  })
  .then(() => {
    console.log('MongoDB Connected...');
    //Server Listener
    app.listen(httpPort, () => {
      console.log(`Server running on port ${httpPort}`);
      console.log('********************* Server Ready *********************');
    });
  })
  .catch((err) => {
    console.log(`Error Mongodb Failed To Connect:  ${err}`);
  });
