const { ToWords } = require('to-words')
const toWords = new ToWords()
const mongoose = require('mongoose')
const orderElementSchema = require('./order-element')

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
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
    items: {
      type: [orderElementSchema],
      default: [],
    },
    // date: new Date().toLocaleDateString('en-gb'),
    // time: String,
    targetDate: String,
    // targetTime: String,
    notes: String,
  },
  {
    timestamps: true,
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
        .map(line => {
          return `
      ${line.quantity} pcs ${line.name}`
        })
        .join('')
    )
  }
}

// module.exports = Order
orderSchema.loadClass(Order)
module.exports = mongoose.model('Order', orderSchema)
