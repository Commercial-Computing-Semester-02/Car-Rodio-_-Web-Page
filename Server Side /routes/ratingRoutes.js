const app = require('express');
const router = app.Router();
const Types = require('../common/Types') // Model types
const routeConstant = require('../common/route-constant');

// CRUD Service
const CRUD = require('../common/CRUD');

// Create
/**
 * @swagger
 * /api/ratings:
 *   post:
 *     description: create a Rating details
 *     tags:
 *      - Rating
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.RATING, res));

//get all
/**
 * @swagger
 * /api/ratings:
 *   get:
 *     description: get all Rating details
 *     tags:
 *      - Rating
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of ratings list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.RATING, res));

//Rating search
/**
 * @swagger
 * /api/ratings/search:
 *   get:
 *     description: get Rating for post
 *     tags:
 *      - Rating
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of Ratings list
 */
 router.post(routeConstant.RATING.SEARCH, (req, res) =>CRUD.search(req.body, Types.RATING, res));

module.exports = router;