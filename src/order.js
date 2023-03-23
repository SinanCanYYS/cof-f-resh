class Order {
  status = 'pending'
  totalCost = 0
  items = []
  date = new Date().toLocaleDateString('en-gb')
  time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })
  constructor(name, restaurant, orderType, targetDate, targetTime, notes) {
    this.name = name
    this.restaurant = restaurant
    this.orderType = orderType
    this.targetDate = new Date(targetDate).toLocaleDateString('en-gb')
    this.targetTime = targetTime
    this.notes = notes
  }

  get orderDeatils() {
    return `
    Name : ${this.name}
    Restaurant : ${this.restaurant.name}
    Order Type : ${this.orderType}
    Status : ${this.status}
    Total Cost : ${this.totalCost}
    Order Date  / Time : ${this.date} / ${this.time}
    Target Date / Time : ${this.targetDate} / ${this.targetTime}
    Notes : ${this.notes}`
  }

  // get orderDeatils2() {
  //   this.items.forEach(item => {
  //     return item[0].name
  //   })
  // }
}

module.exports = Order
