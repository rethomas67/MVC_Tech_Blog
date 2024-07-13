const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//retrieve the comments and the user who submitted the comment
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "post_date"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "comment_date", "post_id", "user_id"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
