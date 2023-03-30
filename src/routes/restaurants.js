var express = require('express')
var router = express.Router()
const Restaurant = require('../restaurant')

console.log('Hello Restaurants')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(Restaurant.list)
})

// Create a new restaurant
router.post('/', function (req, res, next) {
  const restaurant = Restaurant.create(req.body)
  res.send(restaurant)
})
module.exports = router
