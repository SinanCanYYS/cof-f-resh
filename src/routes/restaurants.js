var express = require('express')
var router = express.Router()
const Restaurant = require('../restaurant')

console.log('Hello Restaurants')

/* GET restaurant listing. */
router.get('/', async function (req, res, next) {
  res.send(await Restaurant.find())
  // if (req.query.view === 'json') return res.send(Restaurant.list)
  // res.render('restaurants', { restaurants: Restaurant.list })
})

// Get a restaurant by name
router.get('/:restaurantID', function (req, res, next) {
  const restaurant = Restaurant.list.find(restaurant => restaurant.name === req.params.restaurantID)
  if (req.query.view === 'json') return res.send(restaurant)
  res.render('restaurant', { restaurant: restaurant, user: restaurant.owner })
})

// Create a new restaurant
router.post('/', function (req, res, next) {
  const restaurant = Restaurant.create(req.body)
  res.send(restaurant)
})
module.exports = router
