const Order = require('./order')
const OrderElement = require('./order-element')
const MenuItem = require('./menu')
const SalesData = require('./stock-control').SalesData
const StockData = require('./stock-control').StockData
const PurchaseData = require('./stock-control').PurchaseData
const Restaurant = require('./restaurant')
const Ingredient = require('./ingredient')

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

  async createOrder({ restaurantID, orderType, targetDate, notes }) {
    const restaurant = await Restaurant.findById(restaurantID)
    // const customer = this
    //if (this.type !== 'Customer') throw new Error('You are not a customer')
    const newOrder = await Order.create({
      customer: this._id,
      restaurant: restaurant,
      orderType: orderType,
      targetDate: targetDate,
      notes: notes,
    })
    restaurant.orderList.push(newOrder)
    await restaurant.save()
    return newOrder
  }

  async createMenuItem(restaurantID, name, type, subType, price) {
    const restaurant = await Restaurant.findById(restaurantID)
    console.log('rest owner: ', restaurant.owner)
    //if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')
    const newMenuItem = await MenuItem.create({ name, type, subType, price })
    restaurant.menu.push(newMenuItem)
    await restaurant.save()
    return newMenuItem
  }

  async createIngredient(restaurantID, name, type, unit) {
    const restaurant = await Restaurant.findById(restaurantID)
    //if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')
    const newIngredient = await Ingredient.create({ name, type, unit })
    restaurant.ingredients.push(newIngredient)
    await restaurant.save()
    return newIngredient
  }

  async addOrderElement(orderID, menuItemID, quantity) {
    console.log('kontrol2', orderID, menuItemID, quantity)
    const order = await Order.findById(orderID)
    console.log('kontrol3')
    const menuItem = await MenuItem.findById(menuItemID)
    console.log('kontrol4')
    //if (this.name !== order.name) throw new Error('You are not the customer of this order')

    if (order.items.map(orderItem => orderItem.name).includes(menuItem.name)) {
      order.items.find(orderItem => orderItem.name === menuItem.name).quantity += quantity
    } else {
      newOrderElement = await OrderElement.create({ menuItem, quantity })
      order.items.push(newOrderElement)
    }
    order.totalCost += order.restaurant.menu.find(item => item.name === menuItem.name).price * quantity
    await order.save()
    return order
  }

  async changeStatus(order, status) {
    // if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')
    order.status = status
    await order.save()
    return order
  }

  // confirmOrder(order) {
  //   if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')

  //   order.status = 'confirmed'
  // }

  // rejectOrder(order) {
  //   if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')

  //   order.status = 'rejected'
  // }

  // completeOrder(order) {
  //   if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')

  //   order.status = 'completed'
  // }

  cancelOrder(order) {
    if (this.name !== order.name) throw new Error('You are not the customer of this order')

    order.status = 'cancelled'
  }

  // addMenuItem(restaurant, item) {
  //   if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

  //   restaurant.menu.map(menuItem => menuItem.name).includes(item.name)
  //     ? console.log('This menu item already exists')
  //     : restaurant.menu.push(item)
  // }

  // addIngredient(restaurant, ingredient) {
  //   if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

  //   restaurant.ingredients.push(ingredient)
  // }

  async createRecipe(menuItem, ingredient, quantity) {
    //addIngredientToRecipe(restaurant, menuItem, ingredient, quantity) {
    if (this !== restaurant.owner) throw new Error('You are not the owner of this restaurant')

    restaurant.menu.find(item => item.name === menuItem.name).recipe.push({ ingredient, quantity })
    await restaurant.save()
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
