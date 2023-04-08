var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Restaurant = require('../models/restaurant')
const MenuItem = require('../models/menu')
// const Restaurant = require('../restaurant')

console.log('Hello Menu-items')

// Get all Menu Items
router.get('/', async function (req, res, next) {
  res.send(await MenuItem.find())
})

// Get a Menu Item by name
router.get('/:restaurantID', function (req, res, next) {
  const restaurant = Restaurant.list.find(restaurant => restaurant.name === req.params.restaurantID)
  if (req.query.view === 'json') return res.send(restaurant)
  res.render('restaurant', { restaurant: restaurant, user: restaurant.owner })
})

// Create a new Menu Item
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const newMenuItem = await user.createMenuItem(
    req.body.restaurant,
    req.body.name,
    req.body.type,
    req.body.subType,
    req.body.price
  )
  res.send(newMenuItem)
})
module.exports = router
