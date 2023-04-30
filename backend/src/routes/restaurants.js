var express = require('express')
var router = express.Router()
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const MenuItem = require('../models/menu')
const Ingredient = require('../models/ingredient')

console.log('Hello Restaurants')

/* GET restaurant listing. */
router.get('/', async function (req, res, next) {
  const restaurants = await Restaurant.find()
  // if (req.query.view === 'json') return res.send(restaurants)
  // if (req.query.view === 'json') return res.send(Restaurant.list)
  // res.render('restaurants', { restaurants })
  res.send(restaurants)
})

// Get a restaurant by ID
router.get('/:restaurantID', async function (req, res, next) {
  const restaurant = await Restaurant.findById(req.params.restaurantID)
  // if (req.query.view === 'json') return res.send(restaurant)
  // res.render('restaurant', { restaurant: restaurant, user: restaurant.owner })
  res.send(restaurant)
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

// addind an Ingredient to recipe of a  Menu item
router.post('/:restaurantID/menu-items/:menuItemID/recipes', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const menuItem = await MenuItem.findById(req.params.menuItemID)
  const ingredient = await Ingredient.findById(req.body.ingredient)

  const newRecipeItem = await user.addRecipeItem(menuItem, ingredient, req.body.quantity)
  res.send(newRecipeItem)
})

module.exports = router
