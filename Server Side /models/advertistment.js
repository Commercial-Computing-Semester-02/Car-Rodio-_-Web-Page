const Sequelize = new require('sequelize');
const db = require('../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const Advertistment = db.define('advertistment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    conditions: DataTypes.STRING,
    transmission: DataTypes.STRING,
    model: DataTypes.STRING,
    brand: DataTypes.STRING,
    colour: DataTypes.STRING,
    years: DataTypes.STRING,
    fuel: DataTypes.STRING,
    miles: DataTypes.INTEGER,
    description: DataTypes.STRING,
    region: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    seller_name: DataTypes.STRING,
    contact: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    approved: DataTypes.INTEGER,
    rejected: DataTypes.INTEGER,
});

module.exports = Advertistment;

// id int IDENTITY(1,1) PRIMARY KEY
// title varchar(255) NOT NULL,
// price int null,
// condition varchar(255) NULL,
// transmission varchar(100) NULL,
// model varchar(20) NULL,
// brand varchar(20) NULL,
// colour varchar(20) NULL,
// year varchar(20) NULL,
// fuel varchar(20) NULL,
// miles int null,
// description varchar(255) NULL,
// region varchar(100) NULL,
// city varchar(20) NULL,
// address varchar(255) NULL,
// name varchar(100) NULL,
// contact varchar(11) NULL,
// uid int not null,
// approved int DEFAULT 0