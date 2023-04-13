const Order = require('./order')
const OrderElement = require('./order-element')
const MenuItem = require('./menu')
const SalesData = require('./stock-control').SalesData
const StockData = require('./stock-control').StockData
const PurchaseData = require('./stock-control').PurchaseData
const Restaurant = require('./restaurant')
const Ingredient = require('./ingredient')

const mongoose = require('mongoose')
// const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: String,
  type: String,
})

class User {
  // constructor(name, type) {
  //   this.name = name
  //   this.type = type
  // }

  async createOrder({ restaurant, orderType, targetDate, notes }) {
    console.log('this.type', this.type)
    //if (!this.type.equals('Customer') throw new Error('You are not a customer')
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
    //if (this.name !== order.name) throw new Error('You are not the customer of this order')
    if (order.items.map(orderItem => orderItem.name).includes(menuItem.name)) {
      order.items.find(orderItem => orderItem.name === menuItem.name).quantity += quantity
    } else {
      const newOrderElement = await OrderElement.create({ menuItem, quantity })
      order.items.push(newOrderElement)
    }
    order.totalCost += menuItem.price * quantity
    await order.save()
    return order
  }

  async changeStatus(order, status) {
    switch (this.type) {
      case 'Customer':
        //if (this.name !== order.name) throw new Error('You are not the customer of this order')
        break
      case 'Owner':
        //if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')
        break
    }
    // if (this !== order.restaurant.owner) throw new Error('You are not the owner of this restaurant')
    order.status = status
    await order.save()
    return order
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

  async addRecipeItem(menuItem, ingredient, quantity) {
    // if (!this._id.equals(restaurant.owner._id)) throw new Error('You are not the owner of this restaurant')
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
