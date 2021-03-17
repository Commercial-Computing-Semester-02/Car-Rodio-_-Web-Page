const express = require('express');
const config = require('../common/environment.json')['local'];
const routeConstant = require('../common/route-constant');

module.exports = function (app) {
    const API_PREFIX = '/api';

    app.get('/', function (req, res) {
        res.send('===========================================================\nWelcome to CAR RODIO  API - V - ' + config.VERSION+'\n==============================================================');
    });

    app.use(API_PREFIX + routeConstant.USER.PREFIX, require('./userRoute'));
}
