/*
 * @Author: The-Court-Of-Owls
 */
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./common/environment.json')['local'];
const chalk = require('chalk');

const db = require('./config/connection');
const app = express();

// swagger definition ========================================

var swaggerDefinition = {
  info: {
    title: 'CAR RODIO API Documentation',
    version: '1.0.0',
    description: 'Documentation for CAR RODIO Project backend',
  },
  host: [process.env.PORT || config.PORT],
  basePath: '/',
  schemes: ["https", "http"]
};

// options for the swagger docs
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
};


// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//=========================================================


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

try {
  db.authenticate();
  console.log(chalk.bgGreen.black('Connection has been established successfully.'));
} catch (error) {
  console.error(chalk.bgRed.black('Unable to connect to the database:', error));
}
//image upload
app.use("/images", express.static("images"));
app.use("/post-images", express.static("post-images"));

//Routes 
var routes = require('./routes/route')(app);

//Up Sever
var serverDateTime = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Colombo'
});

const port = process.env.PORT || config.PORT;

app.listen(port, () => {
  console.log(chalk.bgWhite.black('\n====================================================================\n>>>           CAR RODIO API server start on port - ' + config.PORT + '           <<<\n===================================================================='));
  console.log(chalk.bold(chalk.white('> ')+' Date Time :' + serverDateTime+'\n'+chalk.white('> ')+' Access '+chalk.bgYellow.black(' SERVER ')+' - '+chalk.blue.underline('http://localhost:' + config.PORT +'/')+'\n'+chalk.white('> ')+' Access to API '+chalk.bgGreenBright.black(' DOCUMENTATION ')+' - '+chalk.blue.underline('http://localhost:' + config.PORT + '/api-docs/')));
  console.log(chalk.bgWhite.black('====================================================================\n'));
});
