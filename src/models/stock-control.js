class SalesData {
  constructor(restaurant, menuItem, year, month, quantity) {
    this.restaurant = restaurant
    this.menuItem = menuItem
    this.year = year
    this.month = month
    this.quantity = quantity
  }
}
class StockData {
  constructor(restaurant, ingredient, year, month, quantity) {
    this.restaurant = restaurant
    this.ingredient = ingredient
    this.year = year
    this.month = month
    this.quantity = quantity
  }
}
class PurchaseData {
  constructor(restaurant, ingredient, year, month, quantity) {
    this.restaurant = restaurant
    this.ingredient = ingredient
    this.year = year
    this.month = month
    this.quantity = quantity
  }
}

module.exports = { SalesData, StockData, PurchaseData }
