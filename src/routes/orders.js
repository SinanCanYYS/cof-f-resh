var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([{ order: 'Americano' }, { order: 'Cappuccino' }, { order: 'Espresso' }])
})

module.exports = router
