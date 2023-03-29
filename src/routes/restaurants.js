var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('restaurants', {
    restaurant: {
      name: 'Federal Coffee',
    },
    owners: [{ name: 'Sinan Can' }, { name: 'John Doe' }, { name: 'Sally Smith' }],
  })
})

module.exports = router
