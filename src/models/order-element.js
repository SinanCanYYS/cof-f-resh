const mongoose = require('mongoose')

const orderElementSchema = new mongoose.Schema({
  menuItem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  quantity: Number,
})
class OrderElement {
  //   constructor(item, quantity) {
  //     this.name = item.name
  //     this.quantity = quantity
  //     this.price = item.price
}
//}

orderElementSchema.loadClass(OrderElement)
module.exports = orderElementSchema
//module.exports = mongoose.model('OrderElement', orderElementSchema)
