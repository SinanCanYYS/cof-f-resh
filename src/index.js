const User = require('./user')
const Restaurant = require('./restaurant')
const MenuItem = require('./menu')
console.log('My first project Cof-f-resh')

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

const americano = new MenuItem('Americano', 'Drink', 'Hot Drink')
const cappuccino = new MenuItem('Cappuccino', 'Drink', 'Hot Drink')
const omelette = new MenuItem('Omelette', 'Food', 'Breakfast')
const salmonSalad = new MenuItem('Salmon Salad', 'Food', 'Lunch')

sinancan.addMenuItem(federal, americano, 3)
sinancan.addMenuItem(federal, cappuccino, 4)
sinancan.addMenuItem(federal, omelette, 6)
sinancan.addMenuItem(federal, salmonSalad, 8)
sinancan.addMenuItem(federal, americano, 3)
johnnyjean.addMenuItem(starbucks, cappuccino, 10)

// johnnyjean.addMenuItem(starbucks, americano)
// johnnyjean.addMenuItem(starbucks, cappuccino)
// rafaelnadal.addMenuItem(bigchefs, salmonSalad)
// rafaelnadal.addMenuItem(bigchefs, omelette)

const sinansOrder = sinan.createOrder(federal, 'toEat', '05/01/2023', '10:30', 'Please extra milk')
const johnsOrder = john.createOrder(starbucks, 'toGo', '05/01/2023', '12:30', 'no sugar')
const rafaelOrder = rafael.createOrder(federal, 'toEat', '05/01/2023', '12:00', '12:30', 'no sugar')

//federal.orderList.push(sinansOrder)
//federal.orderList.push(rafaelOrder)
// const rafaelOrder = rafael.createOrder(bigchefs, 'toEat', '05/01/2023', '12:00', '12:30', 'no sugar')

sinan.addOrderElement(sinansOrder, americano, 2)
sinan.addOrderElement(sinansOrder, cappuccino, 4)
sinan.addOrderElement(sinansOrder, omelette, 1)
sinan.addOrderElement(sinansOrder, americano, 1)
john.addOrderElement(johnsOrder, cappuccino, 5)
john.addOrderElement(johnsOrder, americano, 1)

console.log(federal.menu)
console.log(sinansOrder.orderDeatils)
console.log(starbucks.menu)
// console.log(federal.orderList)
sinancan.confirmOrder(sinansOrder)
console.log('=====================================================')
// console.log(federal.orderList)

//console.log(johnsOrder.orderDeatils)

//console.log(federal.PendingOrders)
//rafaelOrder.status = 'confirmed'
console.log(federal.pendingOrders)
//console.log(sinansOrder.items)
