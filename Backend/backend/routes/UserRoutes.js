const express = require("express");
const {
  registerUser,
  loggedInUser,
  getUsers,
} = require("../Controller/UserController");

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loggedInUser", loggedInUser);
router.get("/getUsers", getUsers);

module.exports = router;
