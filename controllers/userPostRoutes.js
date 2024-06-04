const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/userPostRoutes/:id", withAuth, async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const userPostData = await Post.findByPk(req.params.id, {
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
    const userPost = userPostData.map((userPost) =>
      userPost.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("userPost", { userPost, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
