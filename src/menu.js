class MenuItem {
  constructor(name, type, price) {
    this.name = name
    this.type = type
    this.price = price
  }
}

class OrderItem {
  constructor(item, quantity) {
    this.name = item
    this.quantity = quantity
  }
}

module.exports = MenuItem
module.exports = OrderItem
