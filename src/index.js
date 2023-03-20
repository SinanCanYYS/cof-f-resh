console.log('My first project Coffresh')

// I need 3 objects, Customer, Order and Restaurant
// Customer can place order to Restaurant and Restaurant can accept or reject the order
// Customer can cancel the order
// Restaurant can see the list of orders
// Restaurant can see the details of the order
// Customer can choose restaurant
// Customer can specify notes for each order

class User {
  picnic = []

  constructor(name) {
    this.name = name
  }

  joinPicnic(picnic) {
    picnic.attendees.push(this)
    this.picnics.push(picnic)
  }
}

const armagan = new User('Armagan')
const numan = new User('Numan')

class Picnic {
  attendees = []
  items = []

  constructor(name, location, date) {
    this.name = name
    this.location = location
    this.date = date
  }
}

const armaganspicnic = {
  name: "Armagan's picnic",
  location: 'Tempelhofer Feld',
  date: '2023-05-01',
  attendees: [armagan],
  items: [],
}

const numanspicnic = {
  name: "Numan's picnic",
  location: 'Hasenheide',
  date: '2023-05-02',
  attendees: [numan],
  items: [],
}

numan.joinPicnic(armaganspicnic)
armagan.joinPicnic(numanspicnic)

// console.log(`armagan has a name of ${armagan.name} and has ${armagan.picnics.length} picnics`)
// console.log(`numan has a name of ${numan.name} and has ${numan.picnics.length} picnics`)
console.log(
  `armaganspicnic has a name of ${armaganspicnic.name} and take place in ${armaganspicnic.location} on ${
    armaganspicnic.date
  } has ${armaganspicnic.attendees.length} attendees : ${armaganspicnic.attendees
    .map(attendee => attendee.name)
    .join(', ')}`
)
console.log(numan)
console.log(armagan)
console.log(armaganspicnic)

//====================================================================================================

const restaurantFederal = {
  name: 'Federal Cafe',
}

const restaurantViyana = {
  name: 'Viyana Kahvesi',
}

const sinan = {
  name: 'Sinan',
  order: [],
}
const yesim = {
  name: 'Yesim',
  order: [],
}

const itemKaffee = {
  itemName: 'Kaffee',
}

const itemCappucino = {
  itemName: 'Cappucino',
}

const sinansOrder = {
  name: "Sinan's Order",
  items: [],
  date: '2023-05-01',
  targetDate: '2023-05-01',
  restaurant: 'Coffresh',
  status: 'pending',
  notes: 'I want to order a coffee',
  orderTime: '10:00',
  targetTime: '10:30',
}
