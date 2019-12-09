const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },
    email : {
        type: String,
        required : [true, 'Email is required']
    },
    password : {
        type: String,
        required: [true, 'Password is Required']
    }
})

const User = model('User', UserSchema );

module.exports = User