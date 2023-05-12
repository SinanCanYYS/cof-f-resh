const { ToWords } = require('to-words')
const toWords = new ToWords()
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
// const orderElementSchema = require('./order-element')

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: { maxDepth: 1 } },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', autopopulate: { maxDepth: 2 } },
    //restaurant: String,
    orderType: String,
    status: {
      type: String,
      default: 'pending',
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    // items: {
    //   //type: [orderElementSchema],
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', autopopulate: { maxDepth: 2 } }],
    //   // type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderElement', autopopulate: { maxDepth: 2 } }],
    //   default: [],
    // },
    items: [
      // {
      //   item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', autopopulate: { maxDepth: 2 } },
      //   quantity: Number,
      // },
    ],

    // date: new Date().toLocaleDateString('en-gb'),
    // time: String,
    targetDate: String,
    // targetTime: String,
    notes: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

class Order {
  // status = 'pending'
  // totalCost = 0
  // items = []
  // date = new Date().toLocaleDateString('en-gb')
  // time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' })
  // constructor(name, restaurant, orderType, targetDate, targetTime, notes) {
  //   this.name = name
  //   this.restaurant = restaurant
  //   this.orderType = orderType
  //   this.targetDate = new Date(targetDate).toLocaleDateString('en-gb')
  //   this.targetTime = targetTime
  //   this.notes = notes
  // }

  // get totalCost() {
  //   return this.items.reduce((acc, item) => {
  //     return acc + item.price * item.quantity
  //   }, 0)
  // }

  get orderDeatils() {
    return (
      `
    Customer Name     : ${this.name}
    Restaurant        : ${this.restaurant.name}
    Order Type        : ${this.orderType}
    Status            : ${this.status}
    Total Cost        : ${this.totalCost} € - ${toWords.convert(this.totalCost)} euros
    Order Date/Time   : ${this.date} / ${this.time}
    Target Date/Time  : ${this.targetDate} / ${this.targetTime}
    Notes             : ${this.notes}
    ----------------------------------------------------------
    Order details     :
    ` +
      this.items
        .map((line) => {
          return `
      ${line.quantity} pcs ${line.name}`
        })
        .join('')
    )
  }
}

// module.exports = Order
orderSchema.loadClass(Order)
orderSchema.plugin(autopopulate)
module.exports = mongoose.model('Order', orderSchema)
