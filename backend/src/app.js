const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoose = require('mongoose')

require('dotenv').config()
require('./database-connection')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const ordersRouter = require('./routes/orders')
const restaurantsRouter = require('./routes/restaurants')
const menuItemsRouter = require('./routes/menu-items')
const ingredientsRouter = require('./routes/ingredients')
const accountRouter = require('./routes/accounts')

const User = require('./models/user')
const passport = require('passport')

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const Restaurant = require('./models/restaurant')
const MenuItem = require('./models/menu')
const Order = require('./models/order')
const Ingredient = require('./models/ingredient')
const OrderElement = require('./models/order-element')

const app = express()

app.set('trust proxy', 1)

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const clientPromise = mongoose.connection.asPromise().then((connection) => (connection = connection.getClient()))

const sessionMiddleware = session({
  secret: 'waldIst7135!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  },
  store: MongoStore.create({ clientPromise: clientPromise, stringify: false }),
})

app.use(sessionMiddleware)

console.log('session store created')

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  const numberOfVisits = req.session.numberOfVisits || 0
  req.session.numberOfVisits = numberOfVisits + 1
  req.session.history = req.session.history || []
  req.session.history.push({ url: req.url })
  req.session.ip = req.ip

  console.log('session :', req.session.numberOfVisits)
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/orders', ordersRouter)
app.use('/restaurants', restaurantsRouter)
app.use('/menu-items', menuItemsRouter)
app.use('/ingredients', ingredientsRouter)
app.use('/accounts', accountRouter)
app.get('/delete', async (req, res) => {
  await User.deleteMany()
  await Restaurant.deleteMany()
  await MenuItem.deleteMany()
  await Order.deleteMany()
  await Ingredient.deleteMany()
  await OrderElement.deleteMany()
  res.send('Deleted')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.createSocketServer = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  })

  app.set('io', io)
  io.engine.use(sessionMiddleware)
  io.engine.use(passport.initialize())
  io.engine.use(passport.session())

  console.log('socket.io server created')

  io.on('connection', function (socket) {
    console.log('a user connected', socket.request.user?._id.toString())

    console.log('user (socket) session :', socket.request.session)
    socket.emit('numberOfVisits', socket.request.session.numberOfVisits)

    socket.on('disconnect', function () {
      console.log('user disconnected')
    })
  })
}

module.exports = app
