class OrderElement {
  constructor(item, quantity) {
    this.name = item
    this.quantity = quantity
    this.price = item.price
  }
}
module.exports = OrderElement
