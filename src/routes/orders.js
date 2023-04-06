var express = require('express')
var router = express.Router()
const Order = require('../models/order')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ order: 'Americano' }, { order: 'Cappuccino' }, { order: 'Espresso' }])
})

router.post('/', async function (req, res, next) {
  const newOrder = await Order.create({
    customer: req.body.customer,
    restaurant: req.body.restaurant,
    orderType: req.body.type,
    targetDate: req.body.targetDate,
    // menuItems: req.body.menuItems,
    // totalCost: req.body.price,
    notes: req.body.notes,
  })
  res.send(newOrder)
})
module.exports = router
