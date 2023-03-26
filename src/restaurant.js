class Restaurant {
  menu = []
  ingredients = []
  orderList = []
  sales = []
  stockQty = []
  purchases = []
  constructor(name, owner, city, district) {
    this.name = name
    this.owner = owner
    this.city = city
    this.district = district
  }

  get pendingOrders() {
    return this.orderList.filter(order => order.status === 'pending')
  }
}
module.exports = Restaurant
