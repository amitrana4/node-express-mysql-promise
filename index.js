'use strict';

/**
 * Created by Amit on 13 may 2018.
 */

// Bring in our dependencies
const app = require('express')();
const routes = require('./Routes');
const Config = require('./Config');
var bodyParser = require('body-parser');

(async () => {

    app.use(bodyParser.urlencoded({
        extended: true
      }));
    app.use(bodyParser.json());
    //  Connect all our routes to our application
    app.use('/', routes);

    // Turn on that server!
    app.listen(Config.APP_CONSTANTS.SERVER.PORTS.HAPI, () => {
    console.log('App listening on port :' + Config.APP_CONSTANTS.SERVER.PORTS.HAPI);
    });
})();
