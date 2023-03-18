const { ObjectId } = require("bson");
const Habit = require("../models/habit");
const User = require("../models/user");



var userEmail = "";

// this function is used to get the day and date of nth previous day from today
function NthDay(n) {
    let d = new Date();
    // console.log(d);
    var day;
    // console.log(d.setDate());
    d.setDate(d.getDate() - n);
    //convert date to 'yyyy-mm-dd'format
    let date = d.toJSON().slice(0, 10);
    // console.log(date);

    switch (d.getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    }
    return { date, day };
}

// this function is used to render the dashboard
module.exports.dashboardPage = async function (req, res) {

    try {
        // console.log("reqQuery", req.query.user);
        const { user: userId } = req.query;

        const user = await User.findOne({ _id: userId });
        //email of user who loggedIn
        userEmail = user.email;

        if (!user) {
            req.flash("error", "User Not found");
            return res.redirect("/users/sign-in");
        }

        //days arr

        var days = [];
        for (let i = 6; i >= 0; i--) {
            //get the past days, today's details and store in days array
            days.push(NthDay(i));
        }
        //get all habits of user
        let habits = await Habit.find({ user: userId })
        console.log(habits);
        return res.render("dashboard", { habits, user, days });

    } catch (err) {
        req.flash("error", "something get wrong");
        return res.redirect("back");
    }

};


// add the habit
module.exports.newHabit = async function (req, res) {
    try {
        const { content } = req.body;
        //getting the id from req.params 
        const { id: userId } = req.params;
        console.log('content', content)

        // no conent
        if (!content) {
            return req.flash("error", "content cann't be empty!!")
        }

        //if content is already present
        const habitAlreadyPresent = await Habit.findOne({
            content,
            user: new ObjectId(userId),
        });

        if (habitAlreadyPresent) {
            let dates = habitAlreadyPresent.dates;

            let today = new Date(Date.now()).toJSON().slice(0, 10);

            dates.find(async (ele, ind) => {
                if (ele.date == today) {
                    // for the current date habit already present
                    req.flash("error", "Entered habit is already exists");
                    return res.redirect("back");

                } else {

                    dates.push({ date: today, complete: "none" });
                    habitAlreadyPresent.dates = dates;

                    await habitAlreadyPresent.save();


                    req.flash("success", `Habit added for the currentDate - ${today}`);
                    return res.redirect("back");
                }
            });
        } else {
            // add the habit if not present
            let dates = [];
            let today = new Date(Date.now()).toJSON().slice(0, 10);

            dates.push({ date: today, complete: "none" });

            //new Habit
            const newHabit = await Habit.create({
                content,
                user: userId,
                dates,
            });
            console.log("newHabit", newHabit);

            req.flash("success", "Habit added successfully");
            return res.redirect("back");
        }
    } catch (err) {
        req.flash("error", "Something went wrong !");
        return res.redirect("back");

    }
};
//update the status of habit
module.exports.updateStatus_habit = async function (req, res) {

    //getting the 'id' and 'date' from req.query
    const habit = await Habit.findById(req.query.id);

    if (!habit) {
        req.flash("error", "something went wrong");
        return res.redirect("back");
    }

    let dates = habit.dates;
    let found = false;


    dates.find((ele) => {
        if (ele.date === req.query.date) {
            const status = ele.complete === "yes" ?
                "no"
                : ele.complete === "no" ?
                    "none" : "yes";

            ele.complete = status;
            found = true;
        }
    });

    if (!found) {
        dates.push({ date: req.query.date, complete: "yes" });
    }

    habit.dates = dates;
    await habit.save();

    console.log(req.query, habit);
    return res.redirect("back");

}
//this function is used to add/remove the habit from favourite
module.exports.mark_unmark_Fav = async function (req, res) {
    try {

        const habit_mark_unMark = await Habit.findOne({ _id: req.query.id });

        habit_mark_unMark.favourite = !habit_mark_unMark.favourite;
        console.log("habitfav", habit_mark_unMark.favourite);

        await habit_mark_unMark.save();
        console.log("habitfav", habit_mark_unMark.favourite);

        let display = habit_mark_unMark.favourite
            ? "Habit marked to fav"
            : "Habit unmarked from fav";

        req.flash("success", display);

        return res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash("error", "Something Went Wrong !!");
        return res.redirect("back");
    }

}
// help to change  the daily and weekly page
module.exports.changePage = async function (req, res) {

    try {
        const user = await User.findOne({ email: userEmail })

        user.viewType = user.viewType === "daily" ? "weekly" : "daily";
        await user.save();
        return res.redirect("back");

    } catch (err) {
        req.flash("error", "something went wrong");
        return res.redirect("back");
    }
}

//   handle to delete habits
module.exports.deleteHabit = async (req, res) => {
    try {
        // To remove the habit  from the from the habit model


        const deletedItem = await Habit.deleteOne({
            _id: req.query.id,
        });

        req.flash("success", "Habit Deleted Successfully");
        return res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash("error", "Something went wrong !");
        return res.redirect("back");
    }
};