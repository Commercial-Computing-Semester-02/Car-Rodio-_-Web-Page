// Model imports
const ResponseService = require('./ResponseService'); // Response service
const Types = require('./Types');
const User = require("../models/user"); // User model
const Advertistment = require("../models/advertistment");
const AdvertistmentImage = require("../models/advertistmentImage");
const Brand = require("../models/brand");
const Comment = require("../models/comment");
const Rating = require("../models/rating");

// Return model by type
function getModelByType(type) {
    // eslint-disable-next-line default-case
    switch (type) {
        case Types.USER:
            return User;
        case Types.ADVERTISTMENT:
            return Advertistment;
        case Types.ADVERTISTMENTIMAGE:
            return AdvertistmentImage;
        case Types.BRAND:
            return Brand;
        case Types.COMMENT:
            return Comment;
        case Types.RATING:
            return Rating;
    }
}

// Create
exports.create = function (val, type, res) {
    const model = getModelByType(type);
    model.create(val)
        .then((confirm) => {
            ResponseService.generalPayloadResponse(null, { addedId: confirm.dataValues.id }, res);
        }).catch(err => ResponseService.generalResponse(err, res));
}

// Delete by ID
exports.deleteById = function (id, type, res) {
    const model = getModelByType(type);
    model.destroy({ where: { id: id } })
        .then(posts => {
            ResponseService.generalPayloadResponse(null, posts, res);
        })
        .catch(err => ResponseService.generalPayloadResponse(err, null, res));
}

// Read all
exports.getAll = function (type, res) {
    const model = getModelByType(type);
    model.findAll()
        .then(posts => {
            ResponseService.generalPayloadResponse(null, posts, res);
        })
        .catch(err => ResponseService.generalPayloadResponse(err, null, res));
}

// Read one by ID
exports.getById = function (id, type, res) {
    const model = getModelByType(type);
    model.findOne({ where: { id: id } })
        .then(post => {
            if (post !== null)
                ResponseService.generalPayloadResponse(null, post, res);
            else ResponseService.generalPayloadResponse(null, post, res, 404, "No record Found");
        })
        .catch(err => ResponseService.generalPayloadResponse(err, null, res));
}

// Update one by ID
exports.updateById = function (val, id, type, res) {
    const model = getModelByType(type);
    model.update(val, { where: { id: id } })
        .then(rowsUpdated => {
            ResponseService.generalPayloadResponse(null, rowsUpdated, res);
        })
        .catch(err => ResponseService.generalPayloadResponse(err, null, res));
}

// Search
exports.search = (searchQuery, type, res) => {
    const model = getModelByType(type);
    model.findAll({ where: searchQuery })
        .then((responce) => ResponseService.generalPayloadResponse(null, responce, res))
        .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};
