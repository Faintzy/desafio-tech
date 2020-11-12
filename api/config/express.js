const config = require('./config');
const bodyParser = require('body-parser');
const express = require('express');
const consign = require('consign');
const cors = require('cors');

module.exports = () => {

    const app = express();

    app.set('port', config.server.port);
    app.use(bodyParser.json());
    app.use(cors());

    consign({cwd: 'backend'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app);
    
    return app;

}