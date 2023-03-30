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

  static create({ name, owner, city, district }) {
    const newRestaurant = new Restaurant(name, owner, city, district)
    console.log('Creating new restaurant', name)
    Restaurant.list.push(newRestaurant)
    return newRestaurant
  }
  static list = []
}
module.exports = Restaurant
