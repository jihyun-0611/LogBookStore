var express = require('express');
var router = express.Router();

const userController = require("../controllers/user");
const user = new userController();

/* POST signup */
router.post("/signup", user.signup)

/* GET signup page. */
router.get('/signup', user.signupPage);

/* POST login */
router.post("/login", user.login);

/* GET login page */
router.get("/login", user.loginPage);

/* GET logout page */
router.get('/logout', user.logout);

module.exports = router;
