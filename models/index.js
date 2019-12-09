// External imports 
const mongoose = require('mongoose')
const DB_URI = 'mongodb://localhost:27017/habit-tracker-backend'
mongoose.connect(DB_URI,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }).then(()=>{console.log('mongoDB connected...')})
  .catch(()=>{console.log('Connection Interrupted...')})


module.exports = {
    User : require('./User'),
    Habit : require('./Habit')
}