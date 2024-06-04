const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all post and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});
//goto the add post view
router.get("/addPost", withAuth, (req, res) => {
  res.render("addPost", { logged_in: req.session.logged_in });
});

router.get("/userPost/:id", withAuth, async (req, res) => {
  try {
    // Get a post and JOIN with user data
    const userPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const userPostEntry = userPostData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render("userPost", {
      ...userPostEntry,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.description);
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    // Get all post and JOIN with user data

    const userPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        { model: Comment, include: [{ model: User }] },
      ],
    });

    // Serialize data so the template can read it
    const userPost = userPostData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render("comments", {
      ...userPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.description);
  }
});

module.exports = router;
