const ResponseService = require('../common/ResponseService'); // Response service
const Comment = require('../models/comment'); 
const sequelize = require('sequelize');

// get comments for post
exports.getByPostId = (postId, res) => {
    Comment.findAll({ where: { postId: postId } })
        .then(comments => ResponseService.generalPayloadResponse(null, comments, res))
        .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};
