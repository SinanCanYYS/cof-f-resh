var express = require('express')
var router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')
const Restaurant = require('../models/restaurant')
const MenuItem = require('../models/menu')
const OrderElement = require('../models/order-element')
// const socketIO = require('socket.io')

/* GET Order details. */
router.get('/:orderID', async function (req, res, next) {
  const order = await Order.findById(req.params.orderID)
  // await MenuItem.find()
  // await OrderElement.find()
  res.send(order)
})

/* GET Order List. */
router.get('/', async function (req, res, next) {
  const orders = await Order.find({ customer: req.user })
  res.send(orders)
})

/* create a new order */
router.post('/', async function (req, res, next) {
  const io = req.app.get('io')
  // const user = await User.findById(req.body.customer)
  const restaurant = await Restaurant.findById(req.body.restaurant)
  const newOrder = await req.user.createOrder({
    restaurant: restaurant,
    orderType: req.body.type,
    targetDate: req.body.targetDate,
    targetTime: req.body.targetTime,
    notes: req.body.notes,
    items: req.body.items,
  })
  console.log('Socket Order created (backend):', newOrder._id)
  io.emit('orderCreated', { orderId: newOrder._id })
  res.send(newOrder)
})

/* add a menu item to an order */
router.post('/:orderID/order-elements', async function (req, res, next) {
  const user = req.user
  const order = await Order.findById(req.params.orderID)
  const menuItem = await MenuItem.findById(req.body.menuItem)
  const newOrderElement = await user.addOrderElement(order, menuItem, req.body.quantity)
  res.send(newOrderElement)
})

/* change the status of an order */
router.patch('/:orderID', async function (req, res, next) {
  const io = req.app.get('io') // socket.io instance
  const user = req.user
  const order = await Order.findById(req.params.orderID)
  try {
    const updatedOrder = await user.changeStatus(order, req.body.status)
    io.emit('orderUpdated', { orderId: updatedOrder._id })
    res.send(updatedOrder)
  } catch (error) {
    res.status(400).send(error.message)
  }
  // const updatedOrder = await user.changeStatus(order, req.body.status)
  // res.send(updatedOrder)
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
