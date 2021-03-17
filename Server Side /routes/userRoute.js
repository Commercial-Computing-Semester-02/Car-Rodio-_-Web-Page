const app = require('express');
const router = app.Router();
const Types = require('../common/Types') // Model types
const routeConstant = require('../common/route-constant');

// CRUD Service
const CRUD = require('../common/CRUD');

const UseController = require('../controllers/userController');

// Create
/**
 * @swagger
 * /api/users:
 *   post:
 *     description: create a User details
 *     tags:
 *      - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.USER, res));

// Sign up
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     description: Sign up
 *     tags:
 *      - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post(routeConstant.USER.SIGNUP, (req, res) => UseController.signUp(req, res));

// Log in
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description:  Log in
 *     tags:
 *      - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post(routeConstant.USER.LOGIN, (req, res) => UseController.logIn(req, res));

//get all
/**
 * @swagger
 * /api/users:
 *   get:
 *     description: get all User details
 *     tags:
 *      - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of User list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.USER, res));

// Get by id
/**
 * @swagger
 * /api/users/user/:id:
 *   get:
 *     description: get user details by id
 *     tags:
 *      - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A User
 */
router.get(routeConstant.USER.GET_USER, (req, res) => CRUD.getById(req.params.id, Types.USER, res));

// Delete by id
/**
 * @swagger
 * /api/users/user/:id:
 *   delete:
 *     description: delete a user by ID
 *     tags:
 *      - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.USER.DELETE_USER, (req, res) => CRUD.deleteById(req.params.id, Types.USER, res));

// update by id
/**
 * @swagger
 * /api/users/user/:id:
 *   put:
 *     description: update a user by ID
 *     tags:
 *      - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.put(routeConstant.USER.PUT_USER, (req, res) => CRUD.updateById(req.body, Types.USER, res));

module.exports = router;