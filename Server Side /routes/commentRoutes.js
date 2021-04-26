const app = require('express');
const router = app.Router();
const Types = require('../common/Types') // Model types
const routeConstant = require('../common/route-constant');

// CRUD Service
const CRUD = require('../common/CRUD');

const CommentController = require('../controllers/commentController');
// Create
/**
 * @swagger
 * /api/comments:
 *   post:
 *     description: create a Comment details
 *     tags:
 *      - Comment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.post('/', (req, res) => CRUD.create(req.body, Types.COMMENT, res));

//get all
/**
 * @swagger
 * /api/comments:
 *   get:
 *     description: get all Comment details
 *     tags:
 *      - Comment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of comments list
 */
router.get('/', (req, res) =>CRUD.getAll(Types.COMMENT, res));

// Delete by id
/**
 * @swagger
 * /api/comments/comment/:id:
 *   delete:
 *     description: delete a Comment by ID
 *     tags:
 *      - Comment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Responce Message
 */
router.delete(routeConstant.COMMENT.SINGLE_ITEM, (req, res) => CRUD.deleteById(req.params.id, Types.COMMENT, res));

//get comments for post
/**
 * @swagger
 * /api/comments/get-for-post/:id:
 *   get:
 *     description: get comments for post
 *     tags:
 *      - Comment
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Array of comments list
 */
 router.get(routeConstant.COMMENT.GET_BY_POSTID, (req, res) =>CommentController.getByPostId(req.params.id, res));

module.exports = router;