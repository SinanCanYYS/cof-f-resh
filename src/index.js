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

const federalAmericano = new MenuItem(federal, 'Americano', 'Drink', 'Hot Drink', 3)
const fededalCappuccino = new MenuItem(federal, 'Cappuccino', 'Drink', 'Hot Drink', 4)
const federalOmelette = new MenuItem(federal, 'Omelette', 'Food', 'Breakfast', 6)
const federalSalmonSalad = new MenuItem(federal, 'Salmon Salad', 'Food', 'Lunch', 8)
const starbucksAmericano = new MenuItem(starbucks, 'Americano', 'Drink', 'Hot Drink', 4)
const starbucksCappuccino = new MenuItem(starbucks, 'Cappuccino', 'Drink', 'Hot Drink', 5)
const bigchefsAmericano = new MenuItem(bigchefs, 'Americano', 'Drink', 'Hot Drink', 5)
const bigchefsOmlette = new MenuItem(bigchefs, 'Omelette', 'Food', 'Breakfast', 9)
const bigchefsSalmonSalad = new MenuItem(bigchefs, 'Salmon Salad', 'Food', 'Lunch', 12)

sinancan.addMenuItem(federal, federalAmericano)
sinancan.addMenuItem(federal, fededalCappuccino)
sinancan.addMenuItem(federal, federalOmelette)
sinancan.addMenuItem(federal, federalSalmonSalad)
johnnyjean.addMenuItem(starbucks, starbucksAmericano)
johnnyjean.addMenuItem(starbucks, starbucksCappuccino)
rafaelnadal.addMenuItem(bigchefs, bigchefsAmericano)
rafaelnadal.addMenuItem(bigchefs, bigchefsOmlette)
rafaelnadal.addMenuItem(bigchefs, bigchefsSalmonSalad)

const sinansOrder = sinan.createOrder(federal, 'toEat', '05/01/2023', '10:30', 'Please extra milk')
const johnsOrder = john.createOrder(starbucks, 'toGo', '05/01/2023', '12:30', 'no sugar')
const rafaelOrder = rafael.createOrder(federal, 'toEat', '05/01/2023', '12:00', '12:30', 'no sugar')

//federal.orderList.push(sinansOrder)
//federal.orderList.push(rafaelOrder)
// const rafaelOrder = rafael.createOrder(bigchefs, 'toEat', '05/01/2023', '12:00', '12:30', 'no sugar')

sinan.addOrderElement(sinansOrder, federalAmericano, 2)
sinan.addOrderElement(sinansOrder, fededalCappuccino, 4)
sinan.addOrderElement(sinansOrder, federalOmelette, 1)
sinan.addOrderElement(sinansOrder, federalAmericano, 1)
john.addOrderElement(johnsOrder, starbucksCappuccino, 5)
john.addOrderElement(johnsOrder, starbucksAmericano, 1)
john.addOrderElement(johnsOrder, starbucksCappuccino, 1)

console.log('=====================================================')

console.log('FEDERAL MENU')
console.log(federal.menu)
console.log(federal.menu.map(item => item.name))
console.log('=====================================================')

console.log('STARBUCKS MENU')
console.log(starbucks.menu)
console.log(starbucks.menu.map(item => item.name))
console.log('=====================================================')

console.log('BIG CHEFS MENU')
console.log(bigchefs.menu)
console.log(bigchefs.menu.map(item => item.name))
console.log('=====================================================')

console.log(sinansOrder.orderDeatils)
console.log(johnsOrder.orderDeatils)
// // console.log(federal.orderList)
// sinancan.confirmOrder(sinansOrder)
// console.log(federal.orderList)

//console.log(johnsOrder.orderDeatils)

//console.log(federal.PendingOrders)
//rafaelOrder.status = 'confirmed'
//console.log(federal.pendingOrders)
//console.log(sinansOrder.items)
