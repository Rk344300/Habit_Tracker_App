const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    //habit's content
    content: {
        type: String,
        required: true,
    },
    // user who added the habit
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    //array to keep track of all dates and the status on that date
    dates: [
        {
            date: String,
            complete: {
                type: String,
                enum: ["yes", "no", "none"]
            },
        }
    ],
    //mark the habit as favourite or not 
    favourite: {
        type: Boolean,
        default: false,
    }

},
    {
        timestamps: true,
    }

);

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;