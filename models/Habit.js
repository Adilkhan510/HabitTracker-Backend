// External Imports
const mongoose = require('mongoose');
const {Schema, model}= mongoose

const HabitSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    daysCompleted : [
        type = Date
    ]

})

const Habit = model('Habit', HabitSchema);

module.exports = Habit