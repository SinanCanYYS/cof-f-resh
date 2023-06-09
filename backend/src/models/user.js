const Order = require('./order')
const OrderElement = require('./order-element')
const MenuItem = require('./menu')
const SalesData = require('./stock-control').SalesData
const StockData = require('./stock-control').StockData
const PurchaseData = require('./stock-control').PurchaseData
const Restaurant = require('./restaurant')
const Ingredient = require('./ingredient')

const mongoose = require('mongoose')
const { default: axios } = require('axios')
const orderElement = require('./order-element')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')
const order = require('./order')

const userSchema = new mongoose.Schema({
  name: String,
  type: String,
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(autopopulate)

class User {
  // constructor(name, type) {
  //   this.name = name
  //   this.type = type
  // }

  async createOrder({ restaurant, orderType, targetDate, targetTime, notes, items }) {
    if (this.type !== 'Customer') throw new Error('You are not a customer')
    const newOrder = await Order.create({
      customer: this._id,
      restaurant: restaurant,
      orderType: orderType,
      targetDate: targetDate,
      targetTime: targetTime,
      notes: notes,
    })
    newOrder.items.push(...items)
    newOrder.totalCost += newOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    await newOrder.save()
    restaurant.orderList.push(newOrder)
    await restaurant.save()
    return newOrder
  }

  async createMenuItem(restaurant, name, type, subType, price) {
    if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')
    const newMenuItem = await MenuItem.create({ name, type, subType, price })
    restaurant.menu.push(newMenuItem)
    await restaurant.save()
    return newMenuItem
  }

  async createIngredient(restaurant, name, type, unit) {
    if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')
    const newIngredient = await Ingredient.create({ name, type, unit })
    restaurant.ingredients.push(newIngredient)
    await restaurant.save()
    return newIngredient
  }

  async addOrderElement(order, menuItem, quantity) {
    if (this.name !== order.customer.name) throw new Error('You are not the customer of this order')
    const existingItem = order.items.find((orderItem) => orderItem.menuItem.name === menuItem.name)
    if (existingItem) {
      existingItem.quantity += quantity
      await existingItem.save()
    } else {
      const newOrderElement = await OrderElement.create({ menuItem, quantity })
      order.items.push(newOrderElement)
    }
    order.totalCost += menuItem.price * quantity
    await order.save()
    console.log('order :', order)
    return order
  }

  async changeStatus(order, status) {
    switch (this.type) {
      case 'Customer':
        if (this.name !== order.customer.name) throw new Error('You are not the customer of this order')
        break
      case 'Owner':
        if (!this._id.equals(order.restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')
        break
    }
    order.status = status
    await order.save()
    return order
  }

  async addRecipeItem(menuItem, ingredient, quantity) {
    //if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')
    // restaurant.menu.find(item => item.name === menuItem.name).recipe.push({ ingredient, quantity })
    menuItem.recipe.push({ ingredient: ingredient, quantity: quantity })
    // await restaurant.save()
    await menuItem.save()
    return menuItem
  }

  inputSalesData(restaurant, menuItem, year, month, quantity) {
    if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant') //console.log('You are not the owner of this restaurant')

    const newSalesData = new SalesData(restaurant, menuItem, year, month, quantity)
    restaurant.sales.push(newSalesData)
  }

  inputStockData(restaurant, ingredient, year, month, quantity) {
    if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')

    const newStockData = new StockData(restaurant, ingredient, year, month, quantity)
    restaurant.stockQty.push(newStockData)
  }

  inputPurchaseData(restaurant, ingredient, year, month, quantity) {
    if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')

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
// userSchema.plugin(autopopulate)
module.exports = mongoose.model('User', userSchema)
