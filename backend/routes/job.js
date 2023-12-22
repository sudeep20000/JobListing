const express = require("express");
const router = express.Router();
const { jobPosts } = require("../controllers/controller");
const authMiddleware = require("../middleware/requireAuth");

router.route("/job-posts").post(authMiddleware, jobPosts);

module.exports = router;
