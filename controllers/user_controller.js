const User = require("../models/user");

//render the sign_up page



module.exports.signUp = function (req, res) {
    return res.render("user_sign_up", {
        title: "HabitTraker | Sign Up",
    });
}

module.exports.signIn = function (req, res) {

    return res.render("user_sign_in", {
        title: "HabitTraker | Sign Up",
    })
}

//create the user

module.exports.create = async function (req, res) {

    try {
        if (req.body.password != req.body.confirm_password) {

            req.flash("error", "password and confirm_password doesnot match");
            return res.redirect("back");
        }

        const ExistingUser = await User.findOne({ email: req.body.email })

        if (ExistingUser) {
            req.flash("error", "Email already exists, Please SignIn to continue");
            return res.redirect("back");
        }

        const user = User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        req.flash('success', 'You have signed up, login to continue!');
        return res.redirect('/users/sign-in');
    }
    catch (err) {
        console.log(err);
        req.flash("error", err);
        return res.redirect("back");
    }


};
// create the session for user
module.exports.createSession = async function (req, res) {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            req.flash("error", "Ivalid Email/password");
            return res.redirect("back");
        }

        //redirect to dashboard
        req.flash("success", "Logged in Successfully");
        return res.redirect(`/dashboard?user=${user._id}`);

    } catch (err) {
        req.flash("error", "something went wrong");
        return res.redirect("back");
    }
}

// to handle logout of a user
module.exports.logOut = (req, res) => {
    req.flash("success", "Logged Out.");
    res.redirect("/users/sign-in");
};
