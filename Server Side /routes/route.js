const express = require('express');
const config = require('../common/environment.json')['local'];
const routeConstant = require('../common/route-constant');

module.exports = function (app) {
    const API_PREFIX = '/api';

    app.get('/', function (req, res) {
        res.send('===========================================================\nWelcome to CAR RODIO  API - V - ' + config.VERSION+'\n==============================================================');
    });

    app.use(API_PREFIX + routeConstant.USER.PREFIX, require('./userRoute'));
    app.use(API_PREFIX + routeConstant.ADVERTISTMENT.PREFIX, require('./advertistmentRoute'));
    app.use(API_PREFIX + routeConstant.BRAND.PREFIX, require('./brandRoutes'));
    app.use(API_PREFIX + routeConstant.COMMENT.PREFIX, require('./commentRoutes'));
    app.use(API_PREFIX + routeConstant.RATING.PREFIX, require('./ratingRoutes'));
}
