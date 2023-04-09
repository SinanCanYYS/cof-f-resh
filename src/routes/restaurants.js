var express = require('express')
var router = express.Router()
const User = require('../models/user')
const Restaurant = require('../models/restaurant')

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
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.owner)
  const restaurant = await Restaurant.create({
    name: req.body.name,
    owner: user,
    city: req.body.city,
    district: req.body.district,
  })
  res.send(restaurant)
})

// Creting a menu item for a restaurant
router.post('/:restaurantID/menu-items', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const newMenuItem = await user.createMenuItem(
    req.params.restaurantID,
    req.body.name,
    req.body.type,
    req.body.subType,
    req.body.price
  )
  res.send(newMenuItem)
})

// Create a new ingredient for a restaurant
router.post('/:restaurantID/ingredients', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const newIngredient = await user.createIngredient(
    req.params.restaurantID,
    req.body.name,
    req.body.type,
    req.body.unit
  )
  res.send(newIngredient)
})
module.exports = router
