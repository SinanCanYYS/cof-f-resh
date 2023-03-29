var express = require('express')
var router = express.Router()
const User = require('../user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})

//   return

//   res.render('users', {
//     user: {
//       name: 'John Doe',
//     },
//     customers: [{ name: 'sinan' }, { name: 'johnny' }, { name: 'rafael' }],
//   })
// })

// Create a new user
router.post('/', function (req, res, next) {
  const user = User.create(req.body)
  res.send(user)
})

module.exports = router
