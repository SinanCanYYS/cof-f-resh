const User = require('./user')
const Product = require('./product')
const Inventory = require('./inventory')
const PaymentProcessor = require('./payment-processor')
const InvoiceManager = require('./invoice-manager')
const eventBus = require('./event-bus')

eventBus.on('buy', () => {
  console.log('buy event received')
})

const inventory = new Inventory()
const paymentProcessor = new PaymentProcessor()
const invoiceManager = new InvoiceManager()

const camera = new Product('Video camera', 999)

inventory.addProduct(camera)
inventory.addProduct(camera)

const sinan = new User()
sinan.addBalance(2000)

sinan.buy(paymentProcessor, inventory, invoiceManager, camera)
sinan.buy(paymentProcessor, inventory, invoiceManager, camera)

console.log(sinan)
