const Sequelize = new require('sequelize');
const db = require('../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        field: 'u_id',
        primaryKey: true,
        autoIncrement: true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
});

module.exports = User;

//   `u_id` int(11) NOT NULL AUTO_INCREMENT,
//    firstname: DataTypes.STRING,
//    lastname: DataTypes.STRING,
//   `delivery_access` varchar(15) NOT NULL,
//   `contact_number` varchar(15) NOT NULL,
//   `email` varchar(30) NOT NULL,
//   `password` varchar(15) NOT NULL,
//   `role` varchar(10) NOT NULL,