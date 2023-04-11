const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const restaurantSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: { maxDepth: 1 } },
  city: String,
  district: String,
  menu: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', autopopulate: { maxDepth: 1 } }],
    default: [],
  },
  ingredients: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', autopopulate: { maxDepth: 1 } }],
    default: [],
  },
  orderList: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order', autopopulate: { maxDepth: 1 } }],
    default: [],
  },
  sales: [],
  stockQty: [],
  purchases: [],
})

class Restaurant {
  //   menu = []
  //   ingredients = []
  //   orderList = []
  //   sales = []
  //   stockQty = []
  //   purchases = []
  //   constructor(name, owner, city, district) {
  //     this.name = name
  //     this.owner = owner
  //     this.city = city
  //     this.district = district
  //   }

  get pendingOrders() {
    return this.orderList.filter(order => order.status === 'pending')
  }

  // static create({ name, owner, city, district }) {
  //   const newRestaurant = new Restaurant(name, owner, city, district)
  //   console.log('Creating new restaurant', name)
  //   Restaurant.list.push(newRestaurant)
  //   return newRestaurant
  // }
  // static list = []
}
// module.exports = Restaurant

restaurantSchema.loadClass(Restaurant)
restaurantSchema.plugin(autopopulate)
module.exports = mongoose.model('Restaurant', restaurantSchema)
