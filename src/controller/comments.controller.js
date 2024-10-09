const prisma = require('../../dbConfig');

exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const { userId } = req.user;

    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
    });

    res.status(201).json({
      message: 'Comment created successfully',
      comment: newComment,
    });
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error creating comment' });
  }
};

exports.editComment = async (req, res) => {
  const { commentId, content } = req.body;
  const { userId } = req.user;

  try {
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    if (!commentExist) {
      return res.status(404).json({ error: 'Comment does not exist or author unauthorized' });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content ?? commentExist.content,
      },
    });

    res.status(200).json({
      message: 'Comment updated successfully',
      updatedComment,
    });
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error updating comment' });
  }
};

exports.getComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error fetching comment' });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.user;

  try {
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: commentId,
        authorId: userId,
      },
    });

    if (!commentExist) {
      return res.status(404).json({ error: 'Comment does not exist or author unauthorized' });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log('Error is: ', error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
