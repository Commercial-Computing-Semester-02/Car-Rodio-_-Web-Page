const Sequelize = new require('sequelize');
const db = require('../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const AdvertistmentImage = db.define('advertistmentImage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    path: DataTypes.STRING,
    adId: DataTypes.INTEGER,
});

module.exports = AdvertistmentImage;

// id int IDENTITY(1,1) PRIMARY KEY,
// adId int not null,
// path varchar(255) NOT NULL,