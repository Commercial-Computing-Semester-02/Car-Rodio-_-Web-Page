const Sequelize = new require('sequelize');
const db = require('../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const Comment = db.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commentedby: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    message: DataTypes.STRING,
});

module.exports = Comment;

// id int IDENTITY(1,1) PRIMARY KEY,
// commentedby int not null,
// postId int not null,
// message varchar(255) NOT NULL,