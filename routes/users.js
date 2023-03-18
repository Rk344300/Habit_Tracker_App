const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user_controller");

//sign-up route
router.get("/sign-up", usersController.signUp);

//sign-in route
router.get("/sign-in", usersController.signIn);

//to create the user
router.post("/create", usersController.create);
//create the session for signIn user
router.post("/create-session", usersController.createSession);
//route for logout the user
router.get('/logout', usersController.logOut);

module.exports = router;