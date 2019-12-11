// External Imports
const mongoose = require('mongoose');
const {Schema, model}= mongoose

const HabitSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    daysCompleted : Array

})

const Habit = model('Habit', HabitSchema);

module.exports = Habit