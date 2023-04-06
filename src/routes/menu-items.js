var express = require('express')
var router = express.Router()
const MenuItem = require('../models/menu')
// const Restaurant = require('../restaurant')

console.log('Hello Menu-items')

// /* GET Menu Items listing. */
// router.get('/', async function (req, res, next) {
//   res.send(await Restaurant.find())
//   // if (req.query.view === 'json') return res.send(Restaurant.list)
//   // res.render('restaurants', { restaurants: Restaurant.list })
// })

// Get a Menu Item by name
router.get('/:restaurantID', function (req, res, next) {
  const restaurant = Restaurant.list.find(restaurant => restaurant.name === req.params.restaurantID)
  if (req.query.view === 'json') return res.send(restaurant)
  res.render('restaurant', { restaurant: restaurant, user: restaurant.owner })
})

// Create a new Menu Item
router.post('/', function (req, res, next) {
  const newMenuItem = MenuItem.create(req.body)
  res.send(newMenuItem)
})
module.exports = router
