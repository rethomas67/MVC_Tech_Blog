const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "post_date"],
      order: [["post_date", "DESC"]],
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

router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      post_date: req.body.postDate,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id },
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
