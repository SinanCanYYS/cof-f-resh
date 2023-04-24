// require('dotenv').config()
// require('./database-connection')

// const User = require('./models/user')
// const Restaurant = require('./models/restaurant')
// const MenuItem = require('./models/menu')
// const Order = require('./models/order')
// const Ingredient = require('./models/ingredient')

const axios = require('axios')
axios.defaults.baseURL = 'http://api:3000'

console.log('My first project Cof-f-resh')

// I need 5 main objects, User, Restaurant, Menu Item, Order, Ingredient
// User can be 2 types, Customer or Owner
// Owner can add Menu Items add Ingredients
// Customer can place order to the any selected Restaurant
// Order can be 2 types, toGo or toEat
// Customer can specify the target time for the order
// Restaurant can confirm, reject or complete the order

async function main() {
  // await User.deleteMany()
  // await Restaurant.deleteMany()
  // await MenuItem.deleteMany()
  // await Order.deleteMany()
  // await Ingredient.deleteMany()

  await axios.get('/delete')

  // // creating users with axios
  // const sinan = await axios.post('/users', {
  //   name: 'Sinan',
  //   type: 'Customer',
  // })

  // const jhonny = await axios.post('/users', {
  //   name: 'Johnny',
  //   type: 'Customer',
  // })

  // const sinancan = await axios.post('/users', {
  //   name: 'Sinan Can',
  //   type: 'Owner',
  // })

  // const jhonnyjean = await axios.post('/users', {
  //   name: 'Johnny Jean',
  //   type: 'Owner',
  // })

  // // creating restaurants with axios
  // const federal = await axios.post('/restaurants', {
  //   name: 'Federal Cafe',
  //   owner: sinancan.data._id,
  //   city: 'Istanbul',
  //   district: 'Galata',
  // })

  // const starbucks = await axios.post('/restaurants', {
  //   name: 'Starbucks',
  //   owner: jhonnyjean.data._id,
  //   city: 'Istanbul',
  //   district: 'Taksim',
  // })

  // // creating menu items with axios
  // const federalLongBlack = await axios.post(`/restaurants/${federal.data._id}/menu-items`, {
  //   user: sinancan.data._id,
  //   name: 'Long Black',
  //   type: 'Drink',
  //   subType: 'Hot Drink',
  //   price: 4,
  // })

  // const federalCappuccino = await axios.post(`/restaurants/${federal.data._id}/menu-items`, {
  //   user: sinancan.data._id,
  //   name: 'Cappuccino',
  //   type: 'Drink',
  //   subType: 'Hot Drink',
  //   price: 5,
  // })

  // const federalLatte = await axios.post(`/restaurants/${federal.data._id}/menu-items`, {
  //   user: sinancan.data._id,
  //   name: 'Latte',
  //   type: 'Drink',
  //   subType: 'Hot Drink',
  //   price: 7,
  // })

  // await axios.post(`/restaurants/${starbucks.data._id}/menu-items`, {
  //   user: jhonnyjean.data._id,
  //   name: 'Cortado',
  //   type: 'Getränk',
  //   subType: 'Heißgetränk',
  //   price: 4,
  // })

  // await axios.post(`/restaurants/${starbucks.data._id}/menu-items`, {
  //   user: jhonnyjean.data._id,
  //   name: 'Aussie Cappuccino',
  //   type: 'Getränk',
  //   subType: 'Heißgetränk',
  //   price: 8,
  // })

  // // creating ingredients with axios
  // const federalMilk = await axios.post(`/restaurants/${federal.data._id}/ingredients`, {
  //   user: sinancan.data._id,
  //   name: 'Milk',
  //   type: 'Drink',
  //   unit: 'ml',
  // })

  // const federalCoffeeBean = await axios.post(`/restaurants/${federal.data._id}/ingredients`, {
  //   user: sinancan.data._id,
  //   name: 'Coffee Beans',
  //   type: 'Drink',
  //   unit: 'gr',
  // })

  // await axios.post(`/restaurants/${federal.data._id}/ingredients`, {
  //   user: sinancan.data._id,
  //   name: 'Syrup',
  //   type: 'Drink',
  //   unit: 'ml',
  // })

  // await axios.post(`/restaurants/${federal.data._id}/ingredients`, {
  //   user: sinancan.data._id,
  //   restaurant: federal.data._id,
  //   name: 'Powder',
  //   type: 'Drink',
  //   unit: 'gr',
  // })

  // await axios.post(`/restaurants/${starbucks.data._id}/ingredients`, {
  //   user: jhonnyjean.data._id,
  //   name: 'Kaffeebohnen',
  //   type: 'Kaffee',
  //   unit: 'gr',
  // })

  // await axios.post(`/restaurants/${starbucks.data._id}/ingredients`, {
  //   user: jhonnyjean.data._id,
  //   name: 'Milch',
  //   type: 'Kaffee',
  //   unit: 'ml',
  // })

  // await axios.post(`/restaurants/${starbucks.data._id}/ingredients`, {
  //   user: jhonnyjean.data._id,
  //   name: 'Sirup',
  //   type: 'Kaffee',
  //   unit: 'ml',
  // })

  // // const response = {
  // //   data: {
  // //     _id: 'sfsdfsdfdsfdsfdsf',
  // //     name: 'Federal Cafe',
  // //     owner: 'Sinan Can',
  // //     city: 'Istanbul',
  // //     district: 'Galata',
  // //   },
  // //   headers: {
  // //     blabla: 'asdasda',
  // //     asda: 'asdasd'
  // //   },
  // //   ...
  // // }

  // // const { data: federal } = response
  // // const federal = response.data

  // // federal._id

  // const allUsers = await axios.get('/users')
  // const allRestaurants = await axios.get('/restaurants')
  // const allMenuItems = await axios.get('/menu-items')
  // const allIngredients = await axios.get('/ingredients')

  // // console.log(allUsers.data)
  // // console.log(allRestaurants.data)
  // // console.log(allMenuItems.data)
  // // console.log(allIngredients.data)

  // // creting Orders with axios
  // const sinansOrder = await axios.post('/orders', {
  //   customer: sinan.data._id,
  //   restaurant: federal.data._id,
  //   type: 'toEat',
  //   targetDate: '07.07.2023',
  //   //time: '10:30',
  //   notes: 'Please extra milk',
  // })

  // const jhonnysOrder = await axios.post('/orders', {
  //   customer: jhonny.data._id,
  //   restaurant: starbucks.data._id,
  //   type: 'toGo',
  //   targetDate: '06/06/2023',
  //   //time: '12:30',
  //   notes: 'no sugar',
  // })
  // // await axios.post('/orders', {
  // //   customer: sinancan.data._id,
  // //   restaurant: starbucks.data._id,
  // //   type: 'toGo',
  // //   targetDate: '09/09/2023',
  // //   //time: '12:30',
  // //   notes: 'yes sugar',
  // // })

  // // await axios.post('/orders', {
  // //   customer: sinan.data._id,
  // //   restaurant: starbucks.data._id,
  // //   type: 'toGo',
  // //   targetDate: '10/10/2023',
  // //   //time: '12:30',
  // //   notes: 'bol bol sugar',
  // // })

  // // adding order elements to orders
  // await axios.post(`/orders/${sinansOrder.data._id}/order-elements`, {
  //   customer: sinan.data._id,
  //   menuItem: federalLongBlack.data._id,
  //   quantity: 2,
  // })

  // await axios.post(`/orders/${sinansOrder.data._id}/order-elements`, {
  //   customer: sinan.data._id,
  //   menuItem: federalCappuccino.data._id,
  //   quantity: 3,
  // })

  // await axios.post(`/orders/${sinansOrder.data._id}/order-elements`, {
  //   customer: sinan.data._id,
  //   menuItem: federalLatte.data._id,
  //   quantity: 6,
  // })

  // await axios.post(`/orders/${sinansOrder.data._id}/order-elements`, {
  //   customer: sinan.data._id,
  //   menuItem: federalCappuccino.data._id,
  //   quantity: 13,
  // })

  // // changing the status of an order by restaurant
  // await axios.patch(`/orders/${sinansOrder.data._id}`, {
  //   user: sinancan.data._id,
  //   status: 'confirmed',
  // })

  // // cancelling an order by customer
  // await axios.patch(`/orders/${jhonnysOrder.data._id}`, {
  //   user: jhonny.data._id,
  //   status: 'cancelled',
  // })

  // //addind an Ingredient to recipe of a  Menu item
  // await axios.post(`/restaurants/${federal.data._id}/menu-items/${federalLongBlack.data._id}/recipes`, {
  //   user: sinancan.data._id,
  //   ingredient: federalCoffeeBean.data._id,
  //   quantity: 22,
  // })

  // await axios.post(`/restaurants/${federal.data._id}/menu-items/${federalCappuccino.data._id}/recipes`, {
  //   user: sinancan.data._id,
  //   ingredient: federalCoffeeBean.data._id,
  //   quantity: 12,
  // })
  // await axios.post(`/restaurants/${federal.data._id}/menu-items/${federalCappuccino.data._id}/recipes`, {
  //   user: sinancan.data._id,
  //   ingredient: federalMilk.data._id,
  //   quantity: 100,
  // })
  const sinan = await axios.post('/users', {
    name: 'Sinan',
    email: 'sinan@coyotiv.com',
    password: '123456!',
    type: 'customer',
  })

  const jhonny = await axios.post('/users', {
    name: 'Jhonny',
    email: 'jhony@coyotiv.com',
    password: '98765!',
    type: 'customer',
  })

  const loggedInSinan = await axios.post('/accounts/session', {
    email: 'sinan@coyotiv.com',
    password: '123456!',
  })

  console.log('Sinan', loggedInSinan.data)
}

setTimeout(() => {
  console.log('starting')
  main().catch((error) => {
    console.log(error.message ? error.message : error)
  })
  console.log('ending')
}, 8000)

// Input Stock Data
// sinancan.inputStockData(federal, federalCoffeeBean, 2022, 12, 100)
// sinancan.inputStockData(federal, federalCoffeeBean, 2023, 01, 150)
// sinancan.inputStockData(federal, federalCoffeeBean, 2023, 02, 125)

//Input Sales Data
// // try {
// //   johnnyjean.inputSalesData(federal, federalAmericano, 2023, 01, 80)
// // } catch (e) {
// //   console.log(e)
// }
// sinancan.inputSalesData(federal, federalCappuccino, 2023, 01, 50)
// sinancan.inputSalesData(federal, federalAmericano, 2023, 02, 60)
// sinancan.inputSalesData(federal, federalCappuccino, 2023, 02, 90)

// Input Purchase Data
// sinancan.inputPurchaseData(federal, federalCoffeeBean, 2023, 01, 100)
// sinancan.inputPurchaseData(federal, federalCoffeeBean, 2023, 02, 150)
