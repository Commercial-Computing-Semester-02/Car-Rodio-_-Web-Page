/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
const Sequelize = require('sequelize');
var config = require('../common/database.json');

module.exports = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        operatorsAliases: false,
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            accuire: 30000,
            idle: 10000
        }
    });

