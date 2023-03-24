const Order = require('./order')
const OrderElement = require('./orderelement')

class User {
  constructor(name, type) {
    this.name = name
    this.type = type
  }

  createOrder(restaurant, orderType, targetDate, targetTime, notes) {
    if (this.type === 'Customer') {
      const newOrder = new Order(this.name, restaurant, orderType, targetDate, targetTime, notes)
      restaurant.orderList.push(newOrder)
      return newOrder
    } else {
      console.log('You are not a customer')
    }
  }

  addOrderElement(order, item, quantity) {
    if (this.type === 'Customer' && this.name === order.name) {
      order.items.push(new OrderElement(item.name, quantity))
      order.totalCost += item.price * quantity
    } else {
      console.log('You are not the customer of this order')
    }
  }

  confirmOrder(order) {
    if (this.type === 'Owner' && this.name === order.restaurant.owner.name) {
      order.status = 'confirmed'
    }
  }

  rejectOrder(order) {
    if (this.type === 'Owner' && this.name === order.restaurant.owner.name) {
      order.status = 'rejected'
    }
  }

  completeOrder(order) {
    if (this.type === 'Owner' && this.name === order.restaurant.owner.name) {
      order.status = 'completed'
    }
  }

  cancelOrder(order) {
    if (this.type === 'Customer' && this.name === order.name) {
      order.status = 'cancelled'
    }
  }

  addMenuItem(restaurant, item, price) {
    if (this.type === 'Owner' && this.name === restaurant.owner.name) {
      item.price = price
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
