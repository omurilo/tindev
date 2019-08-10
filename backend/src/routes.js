const express = require("express");
const DevController = require("./Controllers/Dev");
const LikeController = require("./Controllers/Like");
const DislikeController = require("./Controllers/Dislike");

const router = express.Router();

router.get("/devs", DevController.index);
router.post("/dev", DevController.store);
router.post("/dev/:devId/like", LikeController.store);
router.post("/dev/:devId/dislike", DislikeController.store);

module.exports = router;
