const User = require('./models/user')
const Restaurant = require('./models/restaurant')
const MenuItem = require('./models/menu')
const Order = require('./models/order')
const Ingredient = require('./models/ingredient')

const axios = require('axios')

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

  // creating users with axios
  const sinan = await axios.post('http://localhost:3000/users', {
    name: 'Sinan',
    type: 'Customer',
  })

  const jhonny = await axios.post('http://localhost:3000/users', {
    name: 'Johnny',
    type: 'Customer',
  })

  const sinancan = await axios.post('http://localhost:3000/users', {
    name: 'Sinan Can',
    type: 'Owner',
  })

  const jhonnyjean = await axios.post('http://localhost:3000/users', {
    name: 'Johnny Jean',
    type: 'Owner',
  })

  // creating restaurants with axios
  const federal = await axios.post('http://localhost:3000/restaurants', {
    name: 'Federal Cafe',
    owner: sinancan.data._id,
    city: 'Istanbul',
    district: 'Galata',
  })

  const starbucks = await axios.post('http://localhost:3000/restaurants', {
    name: 'Starbucks',
    owner: jhonnyjean.data._id,
    city: 'Istanbul',
    district: 'Taksim',
  })

  await axios.post('http://localhost:3000/restaurants', {
    name: 'Big Chefs',
    owner: 'Rafael Nadal',
    city: 'Istanbul',
    district: 'Taksim',
  })

  // creating menu items with axios
  await axios.post('http://localhost:3000/menu-items', {
    user: sinancan.data._id,
    restaurant: federal.data._id,
    name: 'Americano',
    type: 'Drink',
    subType: 'Hot Drink',
    price: 3,
  })

  await axios.post('http://localhost:3000/menu-items', {
    user: sinancan.data._id,
    restaurant: federal.data._id,
    name: 'Capuccino',
    type: 'Drink',
    subType: 'Hot Drink',
    price: 5,
  })

  await axios.post('http://localhost:3000/menu-items', {
    user: jhonnyjean.data._id,
    restaurant: starbucks.data._id,
    name: 'Cortado',
    type: 'Getränk',
    subType: 'Heißgetränk',
    price: 4,
  })

  await axios.post('http://localhost:3000/menu-items', {
    user: jhonnyjean.data._id,
    restaurant: starbucks.data._id,
    name: 'Aussie Cappuccino',
    type: 'Getränk',
    subType: 'Heißgetränk',
    price: 8,
  })

  // creating ingredients with axios
  await axios.post('http://localhost:3000/ingredients', {
    user: sinancan.data._id,
    restaurant: federal.data._id,
    name: 'Milk',
    type: 'Drink',
    unit: 'ml',
  })

  await axios.post('http://localhost:3000/ingredients', {
    user: sinancan.data._id,
    restaurant: federal.data._id,
    name: 'Coffee Beans',
    type: 'Drink',
    unit: 'gr',
  })

  await axios.post('http://localhost:3000/ingredients', {
    user: sinancan.data._id,
    restaurant: federal.data._id,
    name: 'Syrup',
    type: 'Drink',
    unit: 'ml',
  })

  await axios.post('http://localhost:3000/ingredients', {
    user: sinancan.data._id,
    restaurant: federal.data._id,
    name: 'Powder',
    type: 'Drink',
    unit: 'gr',
  })

  await axios.post('http://localhost:3000/ingredients', {
    user: jhonnyjean.data._id,
    restaurant: starbucks.data._id,
    name: 'Kaffeebohnen',
    type: 'Kaffee',
    unit: 'gr',
  })

  await axios.post('http://localhost:3000/ingredients', {
    user: jhonnyjean.data._id,
    restaurant: starbucks.data._id,
    name: 'Milch',
    type: 'Kaffee',
    unit: 'ml',
  })

  await axios.post('http://localhost:3000/ingredients', {
    user: jhonnyjean.data._id,
    restaurant: starbucks.data._id,
    name: 'Sirup',
    type: 'Kaffee',
    unit: 'ml',
  })

  // const response = {
  //   data: {
  //     _id: 'sfsdfsdfdsfdsfdsf',
  //     name: 'Federal Cafe',
  //     owner: 'Sinan Can',
  //     city: 'Istanbul',
  //     district: 'Galata',
  //   },
  //   headers: {
  //     blabla: 'asdasda',
  //     asda: 'asdasd'
  //   },
  //   ...
  // }

  // const { data: federal } = response
  // const federal = response.data

  // federal._id

  const allUsers = await axios.get('http://localhost:3000/users')
  const allRestaurants = await axios.get('http://localhost:3000/restaurants')
  const allMenuItems = await axios.get('http://localhost:3000/menu-items')
  const allIngredients = await axios.get('http://localhost:3000/ingredients')

  // console.log(allUsers.data)
  // console.log(allRestaurants.data)
  // console.log(allMenuItems.data)
  // console.log(allIngredients.data)

  // creting Orders with axios
  const sinansOrder = await axios.post('http://localhost:3000/orders', {
    customer: sinan.data._id,
    restaurant: federal.data._id,
    type: 'toEat',
    targetDate: '07.07.2023',
    //time: '10:30',
    notes: 'Please extra milk',
  })
  console.log('sinans Order: ', sinansOrder.data)

  await axios.post('http://localhost:3000/orders', {
    customer: jhonny.data._id,
    restaurant: starbucks.data._id,
    type: 'toGo',
    targetDate: '06/06/2023',
    //time: '12:30',
    notes: 'no sugar',
  })
  await axios.post('http://localhost:3000/orders', {
    customer: sinancan.data._id,
    restaurant: starbucks.data._id,
    type: 'toGo',
    targetDate: '09/09/2023',
    //time: '12:30',
    notes: 'yes sugar',
  })

  await axios.post('http://localhost:3000/orders', {
    customer: sinan.data._id,
    restaurant: starbucks.data._id,
    type: 'toGo',
    targetDate: '10/10/2023',
    //time: '12:30',
    notes: 'bol bol sugar',
  })

  // Creating Orders
  // const sinansOrder = sinan.createOrder(federal, 'toEat', '05/01/2023', '10:30', 'Please extra milk')
  // const johnsOrder = john.createOrder(starbucks, 'toGo', '05/01/2023', '12:30', 'no sugar')
  // const rafaelOrder = rafael.createOrder(federal, 'toEat', '05/01/2023', '12:00', '12:30', 'no sugar')

  //const sinan = await axios.get('http://localhost:3000/users/Sinan')
  //console.log(sinan.data)

  // console.log(sinan.data)
  // console.log(johnny.data)
}

main().catch(error => {
  console.log(error.message ? error.message : error)
})

// Adding order elements to Orders
// sinan.addOrderElement(sinansOrder, federalAmericano, 2)
// sinan.addOrderElement(sinansOrder, federalCappuccino, 4)
// sinan.addOrderElement(sinansOrder, federalOmelette, 1)
// sinan.addOrderElement(sinansOrder, federalAmericano, 1)
// john.addOrderElement(johnsOrder, starbucksCappuccino, 5)
// john.addOrderElement(johnsOrder, starbucksAmericano, 1)
// john.addOrderElement(johnsOrder, starbucksCappuccino, 1)
// rafael.addOrderElement(rafaelOrder, federalSalmonSalad, 3)

// Adding ingredients to Menu Item's recipes
// sinancan.addIngredientToRecipe(federal, federalAmericano, federalCoffeeBean, 24)
// sinancan.addIngredientToRecipe(federal, federalCappuccino, federalCoffeeBean, 12)
// sinancan.addIngredientToRecipe(federal, federalCappuccino, federalMilk, 100) // 100 ml

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
