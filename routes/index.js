const express = require('express');

const router = express.Router();

const HabitController = require("../controllers/habit_controller")

//route to get the dashboard 

router.get("/dashboard", HabitController.dashboardPage);

// adding the habit
router.post("/newHabit/:id", HabitController.newHabit);

//updating the status of habit
router.get('/updateStatus_habit', HabitController.updateStatus_habit);

//mark the habit as favourite/unfavourite
router.get('/mark_to_fav', HabitController.mark_unmark_Fav);

//change the page to daily or weekly 
router.post('/change-page', HabitController.changePage);

//delete the habit
router.get("/delete", HabitController.deleteHabit);

router.use("/users", require("./users"));

module.exports = router;