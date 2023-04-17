var express = require('express')
var router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const MenuItem = require('../models/menu')
const OrderElement = require('../models/order-element')

/* GET Order details. */
router.get('/:orderID', async function (req, res, next) {
  const order = await Order.findById(req.params.orderID)
  // await MenuItem.find()
  // await OrderElement.find()
  res.render('order', { title: 'Order Details', order: order })
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

/* change the quantity of an order element */
router.patch('/:orderID/order-elements/:orderElementID', async function (req, res, next) {
  console.log('Changing quantity of order element')
  const newOrderElemnt = await OrderElement.findByIdAndUpdate(req.params.orderElementID, {
    quantity: req.body.quantity,
  })
  res.send(newOrderElemnt)
})

module.exports = router
