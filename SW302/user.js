const Order = require('./order')
const eventBus = require('./event-bus')

module.exports = class User {
  orders = []
  balance = 0

  buy(paymentProcessor, inventory, invoiceManager, product) {
    eventBus.emit('buy', this, product)
    // const payment = paymentProcessor.pay(this, product)
    inventory.removeProduct(product)
    const invoice = invoiceManager.issueInvoice(payment, this)
    const order = new Order(product, invoice)

    this.orders.push(order)
  }

  addBalance(amount) {
    this.balance += amount
  }
}
