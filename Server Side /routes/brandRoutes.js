const app = require('express');
const router = app.Router();
const Types = require('../common/Types') // Model types
const routeConstant = require('../common/route-constant');

// CRUD Service
const CRUD = require('../common/CRUD');

// Create
/**
 * @swagger
 * /api/brands:
 *   post:
 *     description: create a brand details
 *     tags:
 *      - Brand
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.BRAND, res));

//get all
/**
 * @swagger
 * /api/brands:
 *   get:
 *     description: get all brand details
 *     tags:
 *      - Brand
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of brands list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.BRAND, res));

// Get by id
/**
 * @swagger
 * /api/brands/brand/:id:
 *   get:
 *     description: get user details by id
 *     tags:
 *      - Brand
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Brand
 */
router.get(routeConstant.BRAND.SINGLE_ITEM, (req, res) => CRUD.getById(req.params.id, Types.BRAND, res));

// Delete by id
/**
 * @swagger
 * /api/brands/brand/:id:
 *   delete:
 *     description: delete a brand by ID
 *     tags:
 *      - Brand
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.BRAND.SINGLE_ITEM, (req, res) => CRUD.deleteById(req.params.id, Types.BRAND, res));

// update by id
/**
 * @swagger
 * /api/brands/brand/:id:
 *   put:
 *     description: update a brand by ID
 *     tags:
 *      - Brand
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(routeConstant.BRAND.SINGLE_ITEM, (req, res) => CRUD.updateById(req.body, Types.BRAND, res));

module.exports = router;