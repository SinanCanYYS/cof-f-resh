var express = require('express')
var router = express.Router()
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const MenuItem = require('../models/menu')
const Ingredient = require('../models/ingredient')

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
  const restaurant = await Restaurant.findById(req.params.restaurantID)
  const newMenuItem = await user.createMenuItem(
    restaurant,
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
  const restaurant = await Restaurant.findById(req.params.restaurantID)
  const newIngredient = await user.createIngredient(restaurant, req.body.name, req.body.type, req.body.unit)
  res.send(newIngredient)
})

// creating a recipe for a Menu Item
router.post('/:restaurantID/menu-items/:menuItemID/recipes', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const restaurant = await Restaurant.findById(req.params.restaurantID)
  const menuItem = await MenuItem.findById(req.params.menuItemID)
  const ingredient = await Ingredient.findById(req.body.ingredient)

  const newRecipe = await user.createRecipe(restaurant, menuItem, ingredient, req.body.quantity)
  res.send(newRecipe)
})

module.exports = router
