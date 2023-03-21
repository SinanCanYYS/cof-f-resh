console.log('My first project Coffresh')

// I need 3 objects, Customer, Order and Restaurant
// Customer can place order to Restaurant and Restaurant can accept or reject the order
// Customer can cancel the order
// Restaurant can see the list of orders
// Restaurant can see the details of the order
// Customer can choose restaurant
// Customer can specify notes for each order

class Item {
  quantity = 0
  whoisBringingWhat = []

  constructor(name, desiredQuantity = 1) {
    this.name = name
    this.desiredQuantity = desiredQuantity
  }

  get quantity() {
    return this.whoisBringingWhat.reduce((acc, curr) => acc + curr.quantity, 0)
  }
}

class User {
  picnics = []

  constructor(name) {
    this.name = name
  }

  createPicnic(name, location, date) {
    const picnic = new Picnic(name, location, date)
    this.joinPicnic(picnic)
    return picnic
  }

  joinPicnic(picnic) {
    picnic.attendees.push(this)
    this.picnics.push(picnic)
  }

  bringItem(name, quantity, picnic) {
    let item = picnic.items.find(item => item.name === name)

    if (!item) {
      item = new Item(name, quantity)
      picnic.items.push(item)
    }

    item.quantity += quantity
    item.whoisBringingWhat.push({
      user: this,
      quantity: quantity,
    })
  }

  leavePicnic(picnic) {
    picnic.attendees = picnic.attendees.filter(attendee => attendee !== this)
    this.picnics = this.picnics.filter(p => p !== picnic)

    picnic.items.forEach(item => {
      item.whoisBringingWhat = item.whoisBringingWhat.filter(whoisBringingWhat => whoisBringingWhat.user !== this)

      if (item.whoisBringingWhat.length === 0) {
        picnic.items = picnic.items.filter(i => i !== item)
      }
      item.quantity = item.whoisBringingWhat.reduce((acc, curr) => acc + curr.quantity, 0)
    })
  }
}

class Picnic {
  attendees = []
  items = []

  constructor(name, location, date) {
    this.name = name
    this.location = location
    this.date = date
  }
}

const armagan = new User('Armagan')
const numan = new User('Numan')
// const armaganspicnic = new Picnic("Armagan's picnic", 'Tempelhofer Feld', '2023-05-01')
// const numanspicnic = new Picnic("Numan's picnic", 'Hasenheide', '2023-05-02')

const armaganspicnic = armagan.createPicnic("Armagan's picnic", 'Tempelhofer Feld', '2023-05-01')
const numanspicnic = numan.createPicnic("Numan's picnic", 'Hasenheide', '2023-05-02')

// const armaganspicnic = armagan.picnics[0]
// const numanspicnic = numan.picnics[0]

numan.joinPicnic(armaganspicnic)
armagan.joinPicnic(numanspicnic)
armagan.bringItem('beer', 6, numanspicnic)

// console.log(`armagan has a name of ${armagan.name} and has ${armagan.picnics.length} picnics`)
// console.log(`numan has a name of ${numan.name} and has ${numan.picnics.length} picnics`)
// console.log(
//   `armaganspicnic has a name of ${armaganspicnic.name} and take place in ${armaganspicnic.location} on ${
//     armaganspicnic.date
//   } has ${armaganspicnic.attendees.length} attendees : ${armaganspicnic.attendees
//     .map(attendee => attendee.name)
//     .join(', ')}`
// )
// console.log(numan)
// console.log(armagan)
console.log(armaganspicnic)

//====================================================================================================

// const restaurantFederal = {
//   name: 'Federal Cafe',
// }

// const restaurantViyana = {
//   name: 'Viyana Kahvesi',
// }

// const sinan = {
//   name: 'Sinan',
//   order: [],
// }
// const yesim = {
//   name: 'Yesim',
//   order: [],
// }

// const itemKaffee = {
//   itemName: 'Kaffee',
// }

// const itemCappucino = {
//   itemName: 'Cappucino',
// }

// const sinansOrder = {
//   name: "Sinan's Order",
//   items: [],
//   date: '2023-05-01',
//   targetDate: '2023-05-01',
//   restaurant: 'Coffresh',
//   status: 'pending',
//   notes: 'I want to order a coffee',
//   orderTime: '10:00',
//   targetTime: '10:30',
// }
