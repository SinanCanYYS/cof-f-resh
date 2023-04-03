var express = require('express')
var router = express.Router()
const User = require('../user')

console.log('Hello Users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
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
