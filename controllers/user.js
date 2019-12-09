const db = require('../models')

const create = (req,res)=>{
    db.User.create(req.body, (error,newUser)=>{
        if (error) return res.status(500).json({
            error : "Please try again, oooooops"
        })
        res.status(201).json({
            status : 201,
            data: newUser
        })
    })
}

const updateUser = (req,res)=>{
    db.User.findByIdAndUpdate(req.params.id, req.body,{new:true},(error,updatedUser)=>{
        if (error) res.status(500).json({
            error: "user doesn't exist",
        })
        res.status(201).json({
            status : 201,
            data : updatedUser
        })
    })
}

const getUserInfo = (req, res)=>{
    db.User.findById(req.params.id).populate('habits').exec((error, foundUser)=>{
        if(error) res.status(500).json({
            error : "Something Went Wrong",
        })
        res.status(201).json({
            status : 201,
            data : foundUser
        })
    })
}

const index = (req,res)=>{
    db.User.find({}).populate('habits').exec((error,foundUsers)=>{
        if (error) res.status(500).json({
            Error: "No users in the database"
        })
        res.status(201).json({
            status: 201,
            data : foundUsers
        })
    })
}


module.exports = {
    create,
    getUserInfo,
    updateUser,
    index
}