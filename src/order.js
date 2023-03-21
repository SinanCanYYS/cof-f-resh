class Order {
  status = 'pending'
  totalCost = 0
  constructor(name, orderType, items, date, targetDate, orderTime, targetTime, restaurant, notes) {
    this.name = name
    this.orderType = orderType
    this.items = items
    this.date = date
    this.targetDate = targetDate
    this.orderTime = orderTime
    this.targetTime = targetTime
    this.restaurant = restaurant
    this.notes = notes
  }
}
module.exports = Order
