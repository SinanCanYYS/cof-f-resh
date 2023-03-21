const User = require('./user')
const Restaurant = require('./restaurant')
const MenuItem = require('./menu')
console.log('My first project Coffresh')

// I need 4 objects, User (customer or owner), Restaurant, Menu Item and Order
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

sinancan.addMenuItem(federal, [americano, cappuccino, omelette])
johnnyjean.addMenuItem(starbucks, [americano, cappuccino])
rafaelnadal.addMenuItem(bigchefs, [omelette, (salmonSalad = new MenuItem('Salmon Salad', 'Food', 8))])

const sinansOrder = sinan.makeOrder(
  'toEat',
  [omelette, americano],
  '2023-05-01',
  '2023-05-01',
  '10:00',
  '10:30',
  'Federal',
  'Please extra milk'
)
const johnsOrder = john.makeOrder(
  'toGo',
  [americano],
  '2023-05-01',
  '2023-05-01',
  '12:00',
  '12:30',
  'Starbucks',
  'no sugar'
)
const rafaelOrder = rafael.makeOrder(
  'toEat',
  [cappuccino],
  '2023-05-01',
  '2023-05-01',
  '12:00',
  '12:30',
  'Big Chefs',
  'no sugar'
)

// console.log(`Sinan has an order of ${sinansOrder.name} and has ${sinansOrder.items.length} items in it`)
// console.log(`John has an order of ${johnsOrder.name} and has ${johnsOrder.items.length} items in it`)
// console.log(`Sinan has an order of ${sinansOrder.name} and total cost is ${sinansOrder.totalCost}`)
// console.log(`John has an order of ${johnsOrder.name} and total cost is ${johnsOrder.totalCost}`)
// console.log(federal.owner.name)
// console.log(sinan)

console.log(federal.menu)
console.log(starbucks.menu)
console.log(bigchefs.menu)
console.log(MenuItem)
