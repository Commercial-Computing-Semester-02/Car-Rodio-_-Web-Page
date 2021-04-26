const Sequelize = new require('sequelize');
const db = require('../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const Brand = db.define('brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
});

module.exports = Brand;

//   `u_id` int(11) NOT NULL AUTO_INCREMENT,
//    name: DataTypes.STRING,