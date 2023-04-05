var express = require('express')
var router = express.Router()
const User = require('../user')

console.log('Hello Users')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
  //if (req.query.view === 'json') return res.send(User.list)
  //res.render('users', { users: User.list })
})

/* GET users by name. */
router.get('/:userID', function (req, res, next) {
  const user = User.list.find(user => user.name === req.params.userID)
  if (req.query.view === 'json') return res.send(user)
  res.render('user', { user: user })
})

// Create a new user
router.post('/', function (req, res, next) {
  const user = User.create({ name: req.body.name, type: req.body.type })
  res.send(user)
})

// Get a user by name
router.get('/:name', function (req, res, next) {
  const user = User.list.find(user => user.name === req.params.name)
  res.send(user)
})

module.exports = router
