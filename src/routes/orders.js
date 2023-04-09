var express = require('express')
var router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ order: 'Americano' }, { order: 'Cappuccino' }, { order: 'Espresso' }])
})

/* create a new order */
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.customer)
  // console.log('user in orders post: ', user)
  // console.log('req.body in rest post: ', req.body.restaurant)
  const newOrder = await user.createOrder({
    restaurantID: req.body.restaurant,
    orderType: req.body.type,
    targetDate: req.body.targetDate,
    notes: req.body.notes,
  })
  console.log('newOrder: ', newOrder.customer)
  res.send(newOrder.customer)
})

/* add a menu item to an order */
router.post('/:orderID/order-elements', async function (req, res, next) {
  const user = await User.findById(req.body.customer)
  console.log('kontrol1', req.params.orderID)
  //const order = await Order.findById(req.params.orderID)
  const newOrderElement = await user.addOrderElement(req.params.orderID, req.body.menuItem, req.body.quantity)
  res.send(newOrderElement)
})

module.exports = router
