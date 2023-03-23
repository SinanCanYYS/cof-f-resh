const User = require('./user')
const Restaurant = require('./restaurant')
const MenuItem = require('./menu')
console.log('My first project Coffresh')

// I need 4 objects, User, Restaurant, Menu Item and Order
// User can be 2 types, Customer or Owner
// Owner can add Menu Items to the Menu
// Customer can make order to the Restaurant
// Order can be 2 types, toGo or toEat
// Customer can specify the target time for the order
// Order can be placed for today or for future

//====================================================================================================

const sinan = new User('Sinan', 'Customer')
const john = new User('John', 'Customer')
const rafael = new User('Rafael', 'Customer')
const sinancan = new User('Sinan Can', 'Owner')
const johnnyjean = new User('Johnny Jean', 'Owner')
const rafaelnadal = new User('Rafael Nadal', 'Owner')

const federal = new Restaurant('Federal Cafe', sinancan, ' Istanbul', 'Galata')
const starbucks = new Restaurant('Starbucks', johnnyjean, 'Istanbul', 'Taksim')
const bigchefs = new Restaurant('Big Chefs', rafaelnadal, 'Istanbul', 'Taksim')

const americano = new MenuItem('Americano', 'Drink', 3)
const cappuccino = new MenuItem('Cappuccino', 'Drink', 4)
const omelette = new MenuItem('Omelette', 'Food', 6)
const salmonSalad = new MenuItem('Salmon Salad', 'Food', 8)

sinancan.addMenuItem(federal, americano)
sinancan.addMenuItem(federal, cappuccino)
sinancan.addMenuItem(federal, omelette)
sinancan.addMenuItem(federal, salmonSalad)
johnnyjean.addMenuItem(starbucks, americano)
johnnyjean.addMenuItem(starbucks, cappuccino)
rafaelnadal.addMenuItem(bigchefs, salmonSalad)
rafaelnadal.addMenuItem(bigchefs, omelette)
sinancan.addMenuItem(federal, americano)

const sinansOrder = sinan.createOrder('Federal', 'toEat', '01/05/2023', '10:30', 'Please extra milk')
const johnsOrder = john.createOrder('Starbucks', 'toGo', '01/05/2023', '12:30', 'no sugar')
const rafaelOrder = rafael.createOrder('Big Chefs', 'toEat', '01/05/2023', '12:00', '12:30', 'no sugar')

sinan.addOrderItem(sinansOrder, americano, 2)
sinan.addOrderItem(sinansOrder, cappuccino, 1)
sinan.addOrderItem(sinansOrder, omelette, 1)
sinan.addOrderItem(sinansOrder, americano, 1)

console.log(sinansOrder)
console.log(sinansOrder.orderDeatils)

// rafael.addOrderItem(sinansOrder, salmonSalad, 1)

// console.log(`Sinan has an order of ${sinansOrder.name} and has ${sinansOrder.items.length} items in it`)
// console.log(`John has an order of ${johnsOrder.name} and has ${johnsOrder.items.length} items in it`)
// console.log(`Sinan has an order of ${sinansOrder.name} and total cost is ${sinansOrder.totalCost}`)
// console.log(`John has an order of ${johnsOrder.name} and total cost is ${johnsOrder.totalCost}`)
// console.log(federal.owner.name)
// console.log(sinan)

// console.log(federal.menu)
// console.log(starbucks.menu)
// console.log(bigchefs.menu)
// console.log(MenuItem)
