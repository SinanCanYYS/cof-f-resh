const Order = require('./order')
const OrderItem = require('./menu')

class User {
  constructor(name, type) {
    this.name = name
    this.type = type
  }

  createOrder(orderType, date, targetDate, orderTime, targetTime, restaurant, notes) {
    if (this.type === 'Customer') {
      const newOrder = new Order(this.name, orderType, date, targetDate, orderTime, targetTime, restaurant, notes)
      return newOrder
    } else {
      console.log('You are not a customer')
    }
  }

  addOrderItem(order, item, quantity) {
    if (this.type === 'Customer' && this.name === order.name) {
      order.items.push(new OrderItem(item.name, quantity))
    } else {
      console.log('You are not the customer of this order')
    }
  }

  addMenuItem(restaurant, item) {
    if (this.type === 'Owner' && this.name === restaurant.owner.name) {
      restaurant.menu.push(item)
    } else {
      console.log('You are not the owner of this restaurant')
    }
  }

  addIngredient(restaurant, ingredient) {
    if (this.type === 'Owner' && this.name === restaurant.owner.name) {
      restaurant.ingredients.push(ingredient)
    } else {
      console.log('You are not the owner of this restaurant')
    }
  }
}
module.exports = User
