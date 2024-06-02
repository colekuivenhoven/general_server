const express = require('express');
const router = express.Router();

const commentController = require('./comments.controller');

// Get all comments
router.get('/getAll', commentController.getComments);

// Get comment by ID
router.get('/getById/:id', commentController.getCommentById);

// Create comment
router.post('/create', commentController.createComment);

// Update comment
router.put('/update/:id', commentController.updateComment);

// Delete comment
router.delete('/delete/:id', commentController.deleteComment);

// Get comments by movie ID
router.get('/getByMovieId/:movie_id', commentController.getCommentsByMovieId);

// Get comments by user ID
router.get('/getByUserId/:user_id', commentController.getCommentsByUserId);

module.exports = router;