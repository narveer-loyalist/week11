const { default: axios } = require("axios");
const express = require("express");
const { default: mongoose } = require("mongoose");
const {
  //   getNews,
  getDefualtNews,
  getNewsBySearch,
  getBreakingNewsHeadlines,
} = require("../Controller/newsController");
const router = express.Router();

// router.get("/", getNews);
router.get("/getDefalutNews", getDefualtNews);
router.get("/getNewsBySearch", getNewsBySearch);
router.get("/getBreakingNewsHeadlines", getBreakingNewsHeadlines);

module.exports = router;
