const Comment = require('./comments.model');

// Get all comments
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json({ message: 'All comments', data: comments });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

// Get comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.json({ message: 'Comment by ID', data: comment });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

// Create comment
exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.json({ message: 'Comment created', data: comment });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

// Update comment
exports.updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Comment updated', data: comment });
    }
    catch (error) {
        res.json({ message: 'Error', data: error });
    }
}

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment deleted', data: comment });
    }
    catch (error) {
        res.json({ message: 'Error', data: error });
    }
}

// Get comments by movie ID
exports.getCommentsByMovieId = async (req, res) => {
    try {
        const comments = await Comment.find({ movie_id: req.params.movie_id });
        res.json({ message: 'Comments by movie ID', data: comments });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};

// Get comments by user ID
exports.getCommentsByUserId = async (req, res) => {
    try {
        const comments = await Comment.find({ user_id: req.params.user_id });
        res.json({ message: 'Comments by user ID', data: comments });
    } catch (error) {
        res.json({ message: 'Error', data: error });
    }
};