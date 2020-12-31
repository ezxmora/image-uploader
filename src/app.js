// Required modules
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Application plugins & handlers
app.use(morgan('short'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/v1', require('./routes'));

// React build file
/*app.get('*', (request, response) => {
    response.sendFile(path.join(`${__dirname}/client/build/index.html`));
});*/

module.exports = app;