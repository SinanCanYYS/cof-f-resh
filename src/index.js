console.log('My first project Coffresh')

// I need 4 objects, Customer, Restaurant, Item and Order
// Customer can choose restaurant
// Each restaurant has a list of items
// Customer can place order to Restaurant and Restaurant can accept or reject the order
// Order can be placed for today or for future
// Order can be 2 types, toGo or toEat
// Restaurant can see the list of orders
// Customer can specify notes for each order
// Customer can specify the target time for the order

//====================================================================================================

const restaurantFederal = {
  name: 'Federal Cafe',
  city: ' Istanbul',
  district: 'Galata',
  menu : [],
}

const restaurantStarbucks = {
  name: 'Starbucks',
  city: 'Istanbul',
  district: 'Taksim',
  menu : [],
}

const sinan = {
  name: 'Sinan',

  order: [],
}
const john = {
  name: 'John',
  order: [],
}

const itemKaffee = {
  itemName: 'Kaffee',
  price : 3 euro,
}

const itemCappuccino = {
  itemName: 'Cappuccino',
  price : 4 euro,
}

const sinansOrder = {
  name: "Sinan's Order",
  type: 'toEat',
  items: [],
  date: '2023-05-01',
  targetDate: '2023-05-01',
  orderTime: '10:00',
  targetTime: '10:30',
  restaurant: 'Federal Cafe',
  status: 'pending',
  notes: 'Please extra milk',
}

const johnsOrder = {
  name: "John's Order",
  type: 'toGo',
  items: [],
  date: '2023-05-01',
  targetDate: '2023-05-01',
  orderTime: '12:00',
  targetTime: '12:30',
  restaurant: 'Starbucks',
  status: 'pending',
  notes: 'no sugar',
}




console.log(`Sinan has an order of ${sinansOrder.name} and has ${sinansOrder.items.length} items`)
