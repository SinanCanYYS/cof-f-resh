const eventBus = require('./event-bus')

module.exports = class PaymentProcessor {
  constructor() {
    eventBus.on('buy', (user, product) => {
      this.pay(user, product)
    })
  }

  pay(user, product) {
    if (user.balance < product.price) throw new Error('Insufficient balance')
    user.balance -= product.price

    return product.price
  }
}
