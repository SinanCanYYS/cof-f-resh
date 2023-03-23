class Order {
  status = 'pending'
  totalCost = 0
  items = []
  date = new Date().toLocaleDateString('en-US')
  time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })
  constructor(name, restaurant, orderType, targetDate, targetTime, notes) {
    this.name = name
    this.restaurant = restaurant
    this.orderType = orderType
    this.targetDate = targetDate
    this.targetTime = targetTime
    this.notes = notes
  }

  get orderDeatils() {
    return `
    Name : ${this.name}
    Restaurant : ${this.restaurant}
    Order Type : ${this.orderType}
    Order Date  / Time : ${this.date} /  ${this.time}
    Target Date / Time : ${this.targetDate} / ${this.targetTime}
    Notes : ${this.notes}
    Items : ${this.items}`
  }
}
module.exports = Order
