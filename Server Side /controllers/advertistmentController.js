const ResponseService = require('../common/ResponseService'); // Response service
const AdvertistmentImage = require('../models/advertistmentImage'); 
const Advertistment = require('../models/advertistment'); 
const sequelize = require('sequelize');

// Upload Ad Images
exports.uploadAdImages = (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const id = req.params.adId;
    AdvertistmentImage.create(
        {
            path: url + "/images/" + req.file.filename,
            adId: id,
        })
        .then((user) => ResponseService.generalPayloadResponse(null, user, res))
        .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};

// Search ADs
exports.search = (searchQuery, res) => {
    Advertistment.findAll({ where: searchQuery })
        .then((posts) => ResponseService.generalPayloadResponse(null, posts, res))
        .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};

// getting images for ad
exports.getImagesById = (adId, res) => {
    AdvertistmentImage.findAll({ where: { adId: adId } })
        .then((images) => ResponseService.generalPayloadResponse(null, images, res))
        .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};

// getting ADs with a single image
exports.getAllAdsImages = (req, res) => {
    Advertistment.findAll()
    .then(result => {

        // getting all images
        AdvertistmentImage.findAll()
        .then((images) => {
            const adIds = [];
            const adImageObj = [];
            const adWithImageObj = [];

            // getting images for one ad
            images.forEach(element => {
                if(!adIds.includes(element.adId)){
                    adIds.push(element.adId);
                    adImageObj.push({
                        id: element.adId,
                        path: element.path
                    });
                }
            });

            // maping single image with a AD
            result.forEach(element => { 
                adImageObj.forEach(element2 => {
                    if(element.id === element2.id){
                        adWithImageObj.push({
                            adDetails: element,
                            image: element2.path
                        })
                    }
                });
            });

            ResponseService.generalPayloadResponse(null, adWithImageObj, res)
        })
        .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
    })
    .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};

// get search ADs with a single image
exports.getAllSearchAdsImages = (searchQuery, res) => {
    Advertistment.findAll({ where: searchQuery })
    .then(result => {

        // getting all images
        AdvertistmentImage.findAll()
        .then((images) => {
            const adIds = [];
            const adImageObj = [];
            const adWithImageObj = [];

            // getting images for one ad
            images.forEach(element => {
                if(!adIds.includes(element.adId)){
                    adIds.push(element.adId);
                    adImageObj.push({
                        id: element.adId,
                        path: element.path
                    });
                }
            });

            // maping single image with a AD
            result.forEach(element => { 
                adImageObj.forEach(element2 => {
                    if(element.id === element2.id){
                        adWithImageObj.push({
                            adDetails: element,
                            image: element2.path
                        })
                    }else{
                        adWithImageObj.push({
                            adDetails: element,
                            image: null
                        })
                    }
                });
            });

            ResponseService.generalPayloadResponse(null, adWithImageObj, res)
        })
        .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
    })
    .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};