const mongoose = require('mongoose')

// class OrderElement {
//   constructor(item, quantity) {
//     this.name = item.name
//     this.quantity = quantity
//     this.price = item.price
//   }
// }

const orderElementSchema = new mongoose.Schema({
  name: String, // menuItem: { type: ObjectId, ref: 'MenuItem' }
  quantity: Number,
  price: Number,
})

module.exports = orderElementSchema
