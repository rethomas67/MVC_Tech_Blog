const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const updatePostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    // Serialize data so the template can read it
    const updatePost = updatePostData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render("updatePost", {
      ...updatePost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
