const Sequelize = new require('sequelize');
const db = require('../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const CommentRating = db.define('commentRating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: DataTypes.INTEGER,
    reviewedUserId: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    description: DataTypes.STRING,
});

module.exports = CommentRating;

// id int IDENTITY(1,1) PRIMARY KEY,
// postId int not null,
// reviewedUserId int not null,
// rate int null,
// description varchar(255) NULL,