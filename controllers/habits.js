const db = require('../models')

const create = (req,res)=>{
    console.log(req.headers)
    console.log(req.body)
    db.Habit.create(req.body,(error,createdHabit)=>{
        if(error) return res.status(500).json({
            error: "Something went wrong please try again"
        })
        console.log('Finding user...')
        db.User.findById(req.body.id,(error,foundUser)=>{
            if(error) return res.status(500).json({
                status:500,
                error: "something went wrong"
            })
            console.log(foundUser)
            if(foundUser){
                foundUser.habits.push(createdHabit);
                foundUser.save((error,savedUser)=>{
                    if(error) return console.log(error);
                    res.status(201).json({
                        status: 201,
                        data: createdHabit,
                    })
                })
            }
        })
        // res.status(201).json({
        //     status:201,
        //     data: createdHabit
        // })
    })
}

const showAll = (req,res)=>{
    db.Habit.find({},(error,foundAll)=>{
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
    db.Habit.findByIdAndUpdate(req.params.id,req.body,{new: true},(err,foundHabit)=>{
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
    db.Habit.findByIdAndDelete(req.params.id,(error,data)=>{
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
const addDate = (req,res)=>{
    console.log("addding datee....")
    db.Habit.findById(req.params.id,(error,foundHabit)=>{
        console.log(req.body)
        if(error) return res.status(401).json({
            error: "something went wrong, check your route",
        })
        console.log("adding habit.....")
        // Finding to see if we already completed that habit/task for the day. 

        let index = foundHabit.daysCompleted.indexOf(req.body.date);
        if(index !== -1){
            // if we did it will be the last element so we will remove it.
            foundHabit.daysCompleted.pop();
            console.log("deleting the date")
            foundHabit.save()
            return res.status(200).json({
                data: foundHabit
            })
        }
        else{
            // else add day to the list. 
            foundHabit.daysCompleted.push(req.body.date);
            foundHabit.save()
            return res.status(200).json({
                data: foundHabit
            })
        }
    })
}
module.exports = {
    create,
    showAll,
    edit,
    destroy,
    addDate
}