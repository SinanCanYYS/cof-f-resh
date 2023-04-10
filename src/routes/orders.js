var express = require('express')
var router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const MenuItem = require('../models/menu')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ order: 'Americano' }, { order: 'Cappuccino' }, { order: 'Espresso' }])
})

/* create a new order */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.customer)
  const restaurant = await Restaurant.findById(req.body.restaurant)
  const newOrder = await user.createOrder({
    restaurant: restaurant,
    orderType: req.body.type,
    targetDate: req.body.targetDate,
    notes: req.body.notes,
  })
  res.send(newOrder)
})

/* add a menu item to an order */
router.post('/:orderID/order-elements', async function (req, res, next) {
  const user = await User.findById(req.body.customer)
  const order = await Order.findById(req.params.orderID)
  const menuItem = await MenuItem.findById(req.body.menuItem)
  const newOrderElement = await user.addOrderElement(order, menuItem, req.body.quantity)
  res.send(newOrderElement)
})

/* change the status of an order */
router.patch('/:orderID', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const order = await Order.findById(req.params.orderID)
  const updatedOrder = await user.changeStatus(order, req.body.status)
  res.send(updatedOrder)
})

module.exports = router
