var express = require('express')
var router = express.Router()
const User = require('../models/user')

console.log('Hello Users')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  //res.send(await User.find())
  // const numberOfVisits = req.session.numberOfVisits || 0

  // console.log('fetching users', numberOfVisits)
  // console.log('req :', req.session.numberOfVisits)

  // req.session.numberOfVisits = numberOfVisits + 1

  // console.log('fetching users2', numberOfVisits)
  // console.log('req2 :', req.session.numberOfVisits)

  const users = await User.find()
  if (req.query.view === 'json') return res.send(users)
  res.render('users', { users })
  //res.send(users)
})

/* GET users by name. */
router.get('/:userID', async function (req, res, next) {
  const user = await User.findById(req.params.userID)
  // if (req.query.view === 'json') return res.send(user)
  // res.render('user', { user: user })
  res.send(user)
})

// Create a new user
router.post('/', async function (req, res, next) {
  const user = await User.create({ name: req.body.name, type: req.body.type })
  res.send(user)
})

// Get a user by name
router.get('/:name', function (req, res, next) {
  const user = User.list.find((user) => user.name === req.params.name)
  res.send(user)
})

module.exports = router
