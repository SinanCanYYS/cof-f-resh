class Order {
  status = 'pending'
  totalCost = 0
  items = []
  date = new Date().toLocaleDateString
  time = new Date().toLocaleTimeString
  constructor(name, restaurant, orderType, targetDate, targetTime, notes) {
    this.name = name
    this.restaurant = restaurant
    this.orderType = orderType
    this.targetDate = targetDate
    this.targetTime = targetTime
    this.notes = notes
  }
}
module.exports = Order
