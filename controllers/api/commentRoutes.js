const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//make sure the user is logged in and add a comment
router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      comment_date: req.body.commentDate,
      user_id: req.session.user_id,
      post_id: req.body.postId,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
