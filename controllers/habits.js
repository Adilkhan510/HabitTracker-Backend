const db = require('../models/Habit')

const create = (req,res)=>{
    db.create(req.body,(error,createdHabit)=>{
        if(error) res.status(500).json({
            error: "Something went wrong please try again"
        })
        res.status(201).json({
            status:201,
            data: createdHabit
        })
    })
}

const showAll = (req,res)=>{
    db.find({},(error,foundAll)=>{
        if(error) res.status(500).json({
            status: 500,
            error: "Something went wrong"
        })
        res.status(201).json({
            status : 201,
            data : foundAll
        })
    })
}

const edit = (req,res)=>{
    db.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,foundHabit)=>{
        if(err) res.status(500).json({
            status: 500,
            error: "Sorry, there is no post with that id"
        })
        res.status(201).json({
            status: 201,
            data: foundHabit
        })
    })
}

const destroy = (req,res)=>{
    db.findByIdAndDelete(req.params.id,(error,data)=>{
        if(error) res.status(500).json({
            status :500,
            error : "Sorry, Please try again"
        })
        res.status(201).json({
            status : 201,
            data: data
        })
    })
}
module.exports = {
    create,
    showAll,
    edit,
    destroy
}