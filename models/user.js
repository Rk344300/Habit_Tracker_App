const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        // name of user
        name: {
            type: String,
            required: true,
        },
        // email of user
        email: {
            type: String,
            required: true,
            Unique: true,
        },
        //password
        password: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        //check the viewType ,whether it is daily or weekly
        viewType: {
            type: String,
            default: "daily",
            enum: ["daily", "weekly"],
        },
    },

    {
        timestamps: true,
    }

)

const User = mongoose.model("User", UserSchema);

module.exports = User;