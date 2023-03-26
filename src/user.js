const Order = require('./order')
const OrderElement = require('./orderelement')
const MenuItem = require('./menu')

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

  addMenuItem(restaurant, item) {
    if (this.type === 'Owner' && this.name === restaurant.owner.name) {
      restaurant.menu.map(menuItem => menuItem.name).includes(item.name)
        ? console.log('This menu item already exists')
        : restaurant.menu.push(item)
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
