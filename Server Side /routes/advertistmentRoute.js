const app = require('express');
const router = app.Router();
const Types = require('../common/Types') // Model types
const routeConstant = require('../common/route-constant');

const multer = require("multer"); // Image uploader package
const DIR = "./images";

// CRUD Service
const CRUD = require('../common/CRUD');

const AdvertistmentController = require('../controllers/advertistmentController')

// Create
/**
 * @swagger
 * /api/advertistments:
 *   post:
 *     description: create a advertistment details
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.ADVERTISTMENT, res));

//get all
/**
 * @swagger
 * /api/advertistments:
 *   get:
 *     description: get all advertistment details
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of advertistment list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.ADVERTISTMENT, res));

// Get by id
/**
 * @swagger
 * /api/advertistments/advertistment/:id:
 *   get:
 *     description: get advertistment details by id
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A advertistment
 */
router.get(routeConstant.ADVERTISTMENT.SINGLE_ITEM, (req, res) => CRUD.getById(req.params.id, Types.ADVERTISTMENT, res));

// Delete by id
/**
 * @swagger
 * /api/advertistments/advertistment/:id:
 *   delete:
 *     description: delete a advertistment by ID
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.ADVERTISTMENT.SINGLE_ITEM, (req, res) => CRUD.deleteById(req.params.id, Types.ADVERTISTMENT, res));

// update by id
/**
 * @swagger
 * /api/advertistments/advertistment/:id:
 *   put:
 *     description: update a advertistment by ID
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(routeConstant.ADVERTISTMENT.SINGLE_ITEM, (req, res) => CRUD.updateById(req.body, req.params.id, Types.ADVERTISTMENT, res));

// update by id
/**
 * @swagger
 * /api/advertistments/upload/:adId:
 *   put:
 *     description: upload images
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
//set the multer storage directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        cb(null, req.params.id + "-" + fileName);
    },
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});

router.post(
    routeConstant.ADVERTISTMENT.UPLOAD,
    upload.single("image"),
    (req, res) => {
        AdvertistmentController.uploadAdImages(req, res);
    }
);

// search ads
/**
 * @swagger
 * /api/advertistments/search:
 *   post:
 *     description: search a advertistments
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
 router.post(routeConstant.ADVERTISTMENT.SEARCH, (req, res) => AdvertistmentController.search(req.body, res));

 // Get images by AD id
/**
 * @swagger
 * /api/advertistments/get-images/:adId:
 *   get:
 *     description: get images
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: images
 */
router.get(routeConstant.ADVERTISTMENT.GET_IMAGES, (req, res) => AdvertistmentController.getImagesById(req.params.adId, res));

 // Get ads with a single image
/**
 * @swagger
 * /api/advertistments/get-ads-image:
 *   get:
 *     description: Get ads
 *     tags:
 *      - Advertistment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: ads & images
 */
 router.get(routeConstant.ADVERTISTMENT.GET_ADS_WITH_SINGLE_IMAGE, (req, res) => AdvertistmentController.getAllAdsImages(req, res));

module.exports = router; 
