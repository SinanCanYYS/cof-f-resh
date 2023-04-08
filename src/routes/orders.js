var express = require('express')
var router = express.Router()
const Order = require('../models/order')
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ order: 'Americano' }, { order: 'Cappuccino' }, { order: 'Espresso' }])
})

router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.customer)
  console.log('user in orders post: ', user)
  console.log('req.body in rest post: ', req.body.restaurant)
  const newOrder = await user.createOrder({
    restaurantID: req.body.restaurant,
    orderType: req.body.type,
    targetDate: req.body.targetDate,
    // menuItems: req.body.menuItems,
    // totalCost: req.body.price,
    notes: req.body.notes,
  })
  res.send(newOrder.orderDetails)
})
module.exports = router
