const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes.js");
//const userPostRoutes = require("./userPostRoutes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
//router.use("/userPostRoutes", userPostRoutes);

module.exports = router;
