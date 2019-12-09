const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

// USER ROUTES

router.post('/user/create', ctrl.auth.create);
router.get('/user/:id', ctrl.user.getUserInfo)
router.get('/users', ctrl.user.index)
router.put('/user/:slug', ctrl.user.updateUser)
router.post('/login', ctrl.auth.login)

// HABITS ROUTES

router.post('/habits/create', ctrl.habit.create)
router.get('/habits', ctrl.habit.showAll)
router.put('/habits/:id/edit', ctrl.habit.edit)
router.delete('/habits/:id',ctrl.habit.destroy)
module.exports = router