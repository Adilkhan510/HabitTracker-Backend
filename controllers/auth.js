const bcrypt = require('bcryptjs')
const db = require('../models')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validation')



const create = async (req,res)=>{
    const { error } = registerValidation(req.body);
    if(error) res.status(500).send(error.details[0].message);
// Check to see if user exists:
    const userExists = await db.User.findOne({email : req.body.email});
    if(userExists) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new db.User({
        name: req.body.name,
        email : req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        return res.status(400).send(error)
    }
}

// From DevED JWT tutorial 
const login = async (req,res)=>{
    const { error } = loginValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);
// Check to see if user exists:
    const user = await db.User.findOne({email : req.body.email});
    console.log(user)
    console.log(req.body)
    if(!user) return res.status(400).send('Email or password invalid')

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Email or password invalid')

    const token = jwt.sign({_id: user.id},"waffles",
    {
      expiresIn: "1h"
    })
    res.send({
        status: 200,
        message: "Success",
        id: user._id,
        token
    })
}


module.exports = {
    create,
    login
}