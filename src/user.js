const Order = require('./order')

class User {
  constructor(name, type) {
    this.name = name
    this.type = type
  }

  makeOrder(orderType, items, date, targetDate, orderTime, targetTime, restaurant, notes) {
    if (this.type === 'Customer') {
      const newOrder = new Order(
        this.name,
        orderType,
        items,
        date,
        targetDate,
        orderTime,
        targetTime,
        restaurant,
        notes
      )
      return newOrder
    } else {
      console.log('You are not a customer')
    }
  }

  addMenuItem(restaurant, item) {
    if (this.type === 'Owner' && this.name === restaurant.owner.name) {
      restaurant.menu.push(item)
    } else {
      console.log('You are not the owner of this restaurant')
    }
  }
}
module.exports = User
