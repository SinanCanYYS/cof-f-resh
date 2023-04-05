const Order = require('./order')
const OrderElement = require('./order-element')
const MenuItem = require('./menu')
const SalesData = require('./stock-control').SalesData
const StockData = require('./stock-control').StockData
const PurchaseData = require('./stock-control').PurchaseData

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  type: String,
})

class User {
  // constructor(name, type) {
  //   this.name = name
  //   this.type = type
  // }

  createOrder(restaurant, orderType, targetDate, targetTime, notes) {
    if (this.type !== 'Customer') throw new Error('You are not a customer')

    const newOrder = new Order(this.name, restaurant, orderType, targetDate, targetTime, notes)
    restaurant.orderList.push(newOrder)
    return newOrder
  }
  u

  addOrderElement(order, item, quantity) {
    if (this.type === 'Customer' && this.name === order.name) {
      if (order.items.map(orderItem => orderItem.name).includes(item.name)) {
        order.items.find(orderItem => orderItem.name === item.name).quantity += quantity
      } else {
        order.items.push(new OrderElement(item, quantity))
      }
      order.totalCost += order.restaurant.menu.find(menuItem => menuItem.name === item.name).price * quantity
    } else {
      console.log('You are not the customer of this order')
    }
  }

  confirmOrder(order) {
    if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')

    order.status = 'confirmed'
  }

  rejectOrder(order) {
    if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')

    order.status = 'rejected'
  }

  completeOrder(order) {
    if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')

    order.status = 'completed'
  }

  cancelOrder(order) {
    if (this.name !== order.name) throw new Error('You are not the customer of this order')

    order.status = 'cancelled'
  }

  addMenuItem(restaurant, item) {
    if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

    restaurant.menu.map(menuItem => menuItem.name).includes(item.name)
      ? console.log('This menu item already exists')
      : restaurant.menu.push(item)
  }

  addIngredient(restaurant, ingredient) {
    if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

    restaurant.ingredients.push(ingredient)
  }

  addIngredientToRecipe(restaurant, menuItem, ingredient, quantity) {
    if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

    restaurant.menu.find(item => item.name === menuItem.name).recipe.push({ ingredient, quantity })
  }

  inputSalesData(restaurant, menuItem, year, month, quantity) {
    if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant') //console.log('You are not the owner of this restaurant')

    const newSalesData = new SalesData(restaurant, menuItem, year, month, quantity)
    restaurant.sales.push(newSalesData)
  }

  inputStockData(restaurant, ingredient, year, month, quantity) {
    if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

    const newStockData = new StockData(restaurant, ingredient, year, month, quantity)
    restaurant.stockQty.push(newStockData)
  }

  inputPurchaseData(restaurant, ingredient, year, month, quantity) {
    if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

    const newPurchaseData = new PurchaseData(restaurant, ingredient, year, month, quantity)
    restaurant.purchases.push({ newPurchaseData })
  }

  // static create({ name, type }) {
  //   console.log('Creating new user', name, type)
  //   const newUser = new User(name, type)
  //   User.list.push(newUser)
  //   return newUser
  // }
  // static list = []
}

// module.exports = User

userSchema.loadClass(User)
module.exports = mongoose.model('User', userSchema)
