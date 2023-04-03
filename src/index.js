// const User = require('./user')
// const Restaurant = require('./restaurant')
// const MenuItem = require('./menu')
// const Ingredient = require('./ingredient')

const axios = require('axios')

console.log('My first project Cof-f-resh')

// I need 5 main objects, User, Restaurant, Menu Item, Order, Ingredient
// User can be 2 types, Customer or Owner
// Owner can add Menu Items add Ingredients
// Customer can place order to the any selected Restaurant
// Order can be 2 types, toGo or toEat
// Customer can specify the target time for the order
// Order can be placed for today or for future
// Restaurant can confirm, reject or complete the order

//====================================================================================================

//fetching users with axios

// axios.get('http://localhost:3000/users').then(response => {
//   console.log(response.data)
// })

// creating users with axios

async function main() {
  await axios.post('http://localhost:3000/users', {
    name: 'Sinan',
    type: 'Customer',
  })

  await axios.post('http://localhost:3000/users', {
    name: 'Johnny',
    type: 'Customer',
  })

  await axios.post('http://localhost:3000/users', {
    name: 'Rafael',
    type: 'Customer',
  })

  await axios.post('http://localhost:3000/users', {
    name: 'Sinan Can',
    type: 'Owner',
  })

  await axios.post('http://localhost:3000/users', {
    name: 'Johnny Jean',
    type: 'Owner',
  })

  await axios.post('http://localhost:3000/users', {
    name: 'Rafael Nadal',
    type: 'Owner',
  })

  const allUsers = await axios.get('http://localhost:3000/users')

  await axios.post('http://localhost:3000/restaurants', {
    name: 'Federal Cafe',
    owner: 'Sinan Can',
    city: 'Istanbul',
    district: 'Galata',
  })

  await axios.post('http://localhost:3000/restaurants', {
    name: 'Starbucks',
    owner: 'Johnny Jean',
    city: 'Istanbul',
    district: 'Taksim',
  })

  await axios.post('http://localhost:3000/restaurants', {
    name: 'Big Chefs',
    owner: 'Rafael Nadal',
    city: 'Istanbul',
    district: 'Taksim',
  })

  const allRestaurants = await axios.get('http://localhost:3000/restaurants')

  console.log(allUsers.data)
  console.log(allRestaurants.data)

  const sinan = await axios.get('http://localhost:3000/users/Sinan')
  console.log(sinan.data)

  // console.log(sinan.data)
  // console.log(johnny.data)
}

main()

// .then(response => {
//   console.log(response.data)
// })

// defining users

// const sinan = new User('Sinan', 'Customer')
// const john = new User('John', 'Customer')
// const rafael = new User('Rafael', 'Customer')
// const sinancan = new User('Sinan Can', 'Owner')
// const johnnyjean = new User('Johnny Jean', 'Owner')
// const rafaelnadal = new User('Rafael Nadal', 'Owner')

// Defining Restaurants
// const federal = new Restaurant('Federal Cafe', sinancan, ' Istanbul', 'Galata')
// const starbucks = new Restaurant('Starbucks', johnnyjean, 'Istanbul', 'Taksim')
// const bigchefs = new Restaurant('Big Chefs', rafaelnadal, 'Istanbul', 'Taksim')

// Defining Menu Items
// const federalAmericano = new MenuItem(federal, 'Americano', 'Drink', 'Hot Drink', 3)
// const federalCappuccino = new MenuItem(federal, 'Cappuccino', 'Drink', 'Hot Drink', 4)
// const federalOmelette = new MenuItem(federal, 'Omelette', 'Food', 'Breakfast', 6)
// const federalSalmonSalad = new MenuItem(federal, 'Salmon Salad', 'Food', 'Lunch', 8)
// const starbucksAmericano = new MenuItem(starbucks, 'Americano', 'Drink', 'Hot Drink', 4)
// const starbucksCappuccino = new MenuItem(starbucks, 'Cappuccino', 'Drink', 'Hot Drink', 5)
// const bigchefsAmericano = new MenuItem(bigchefs, 'Americano', 'Drink', 'Hot Drink', 5)
// const bigchefsOmlette = new MenuItem(bigchefs, 'Omelette', 'Food', 'Breakfast', 9)
// const bigchefsSalmonSalad = new MenuItem(bigchefs, 'Salmon Salad', 'Food', 'Lunch', 12)

// Adding Menu Items to the Restaurant's Menu
// sinancan.addMenuItem(federal, federalAmericano)
// sinancan.addMenuItem(federal, federalCappuccino)
// sinancan.addMenuItem(federal, federalOmelette)
// sinancan.addMenuItem(federal, federalSalmonSalad)
// johnnyjean.addMenuItem(starbucks, starbucksAmericano)
// johnnyjean.addMenuItem(starbucks, starbucksCappuccino)
// rafaelnadal.addMenuItem(bigchefs, bigchefsAmericano)
// rafaelnadal.addMenuItem(bigchefs, bigchefsOmlette)
// rafaelnadal.addMenuItem(bigchefs, bigchefsSalmonSalad)

// Creating Orders
// const sinansOrder = sinan.createOrder(federal, 'toEat', '05/01/2023', '10:30', 'Please extra milk')
// const johnsOrder = john.createOrder(starbucks, 'toGo', '05/01/2023', '12:30', 'no sugar')
// const rafaelOrder = rafael.createOrder(federal, 'toEat', '05/01/2023', '12:00', '12:30', 'no sugar')

// Adding order elements to Orders
// sinan.addOrderElement(sinansOrder, federalAmericano, 2)
// sinan.addOrderElement(sinansOrder, federalCappuccino, 4)
// sinan.addOrderElement(sinansOrder, federalOmelette, 1)
// sinan.addOrderElement(sinansOrder, federalAmericano, 1)
// john.addOrderElement(johnsOrder, starbucksCappuccino, 5)
// john.addOrderElement(johnsOrder, starbucksAmericano, 1)
// john.addOrderElement(johnsOrder, starbucksCappuccino, 1)
// rafael.addOrderElement(rafaelOrder, federalSalmonSalad, 3)

// Defining ingredients
// const federalCoffeeBean = new Ingredient(federal, 'Coffee Bean', 'Drink', 'gr')
// const federalMilk = new Ingredient(federal, 'Milk', 'Drink', 'ml')
// const federalEgg = new Ingredient(federal, 'Egg', 'Food', 'pcs')
// const federalSalmon = new Ingredient(federal, 'Salmon', 'Food', 'gr')
// const starbucksCoffeeBean = new Ingredient(starbucks, 'Coffee Bean', 'Drink', 'gr')
// const starbucksMilk = new Ingredient(starbucks, 'Milk', 'Drink', 'ml')
// const bigchefsCoffeeBean = new Ingredient(bigchefs, 'Coffee Bean', 'Drink', 'gr')
// const bigchefsEgg = new Ingredient(bigchefs, 'Egg', 'Food', 'pcs')
// const bigchefsSalmon = new Ingredient(bigchefs, 'Salmon', 'Food', 'gr')

// Adding ingredients to Restaurant's ingredient list
// sinancan.addIngredient(federal, federalCoffeeBean)
// sinancan.addIngredient(federal, federalMilk)
// sinancan.addIngredient(federal, federalEgg)
// sinancan.addIngredient(federal, federalSalmon)
// johnnyjean.addIngredient(starbucks, starbucksCoffeeBean)
// johnnyjean.addIngredient(starbucks, starbucksMilk)
// rafaelnadal.addIngredient(bigchefs, bigchefsCoffeeBean)
// rafaelnadal.addIngredient(bigchefs, bigchefsEgg)
// rafaelnadal.addIngredient(bigchefs, bigchefsSalmon)

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

// console.log(sinansOrder)
// console.log(federal.stockQty)
// console.log('=====================================================')
// console.log(federal.stockQty[0].year)
//console.log(federal.stockQty[0].restaurant.city)

//console.log(federalAmericano.recipeDetails)
//console.log(federalCappuccino.recipeDetails)

//console.log(sinansOrder.orderDeatils)

//console.log(federalAmericano.recipe[0].ingredient.name)

// console.log('FEDERAL INGREDIENTS')
// console.log(federal.ingredients)
// console.log(federal.ingredients.map(item => item.name))

// console.log('=====================================================')

// console.log('FEDERAL MENU')
//console.log(federal.menu)
// console.log(federal.menu.map(item => item.name))
// console.log('=====================================================')

// console.log('STARBUCKS MENU')
// console.log(starbucks.menu)
// console.log(starbucks.menu.map(item => item.name))
// console.log('=====================================================')

// console.log('BIG CHEFS MENU')
// console.log(bigchefs.menu)
// console.log(bigchefs.menu.map(item => item.name))
// console.log('=====================================================')
