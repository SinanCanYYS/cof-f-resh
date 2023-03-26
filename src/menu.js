class MenuItem {
  ingredients = []
  constructor(restaurant, name, type, subType, price) {
    this.restaurant = restaurant
    this.name = name
    this.type = type
    this.subType = subType
    this.price = price
  }
}

module.exports = MenuItem
