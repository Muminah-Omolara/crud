const express = require('express');
const { createComment, editComment, getComment, deleteComment } = require('../controller/post.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/comments', authMiddleware, createComment);
router.put('/comments', authMiddleware, editComment);
router.get('/comments/:commentId', authMiddleware, getComment);
router.delete('/comments/:commentId', authMiddleware, deleteComment);


module.exports = router;
