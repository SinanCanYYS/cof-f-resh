const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const orderElementSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', autopopulate: { maxDepth: 2 } },
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
orderElementSchema.plugin(autopopulate)
//module.exports = orderElementSchema
module.exports = mongoose.model('OrderElement', orderElementSchema)
