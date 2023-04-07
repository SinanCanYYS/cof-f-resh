var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Ingredient = require('../models/ingredient')

//var Restaurant = require('../models/restaurant')
//const MenuItem = require('../models/menu')
// const Restaurant = require('../restaurant')

console.log('Hello Ingredients')

// Get all Ingredients
router.get('/', async function (req, res, next) {
  res.send(await Ingredient.find())
})

// Get a Ingredient by name
router.get('/:restaurantID', function (req, res, next) {
  const restaurant = Restaurant.list.find(restaurant => restaurant.name === req.params.restaurantID)
  if (req.query.view === 'json') return res.send(restaurant)
  res.render('restaurant', { restaurant: restaurant, user: restaurant.owner })
})

// Create a new Ingredient
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const newIngredient = await user.createIngredient(req.body.restaurant, req.body.name, req.body.type, req.body.unit)
  res.send(newIngredient)
})
module.exports = router
