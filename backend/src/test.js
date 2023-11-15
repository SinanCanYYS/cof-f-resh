// require('dotenv').config()
// require('./database-connection')

// const User = require('./models/user')
// const Restaurant = require('./models/restaurant')
// const MenuItem = require('./models/menu')
// const Order = require('./models/order')
// const Ingredient = require('./models/ingredient')

const axios = require('axios')
axios.defaults.baseURL = 'http://api:3000'

console.log('My first project Cof-f-resh')

async function main() {
  // await axios.get('/delete')
  // const sinan = await axios.post('/users', {
  //   name: 'Sinan',
  //   email: 'sinan@coyotiv.com',
  //   password: '123456!',
  //   type: 'customer',
  // })
  // const jhonny = await axios.post('/users', {
  //   name: 'Jhonny',
  //   email: 'jhony@coyotiv.com',
  //   password: '98765!',
  //   type: 'customer',
  // })
  // console.log('Sinan created', sinan.data.email)
  // console.log('Jhonny created', jhonny.data.email)
  // const loggedInSinan = await axios.post('/accounts/session', {
  //   email: 'sinan@coyotiv.com',
  //   password: '123456!',
  // })
  // console.log('Sinan', loggedInSinan.data)
}

setTimeout(() => {
  console.log('starting')
  main().catch((error) => {
    console.log(error.message ? error.message : error)
  })
  console.log('ending')
}, 8000)

// Input Stock Data
// sinancan.inputStockData(federal, federalCoffeeBean, 2022, 12, 100)
// sinancan.inputStockData(federal, federalCoffeeBean, 2023, 01, 150)
// sinancan.inputStockData(federal, federalCoffeeBean, 2023, 02, 125)

//Input Sales Data
// // try {
// //   johnnyjean.inputSalesData(federal, federalAmericano, 2023, 01, 80)
// // } catch (e) {
// //   console.log(e)
// }
// sinancan.inputSalesData(federal, federalCappuccino, 2023, 01, 50)
// sinancan.inputSalesData(federal, federalAmericano, 2023, 02, 60)
// sinancan.inputSalesData(federal, federalCappuccino, 2023, 02, 90)

// Input Purchase Data
// sinancan.inputPurchaseData(federal, federalCoffeeBean, 2023, 01, 100)
// sinancan.inputPurchaseData(federal, federalCoffeeBean, 2023, 02, 150)

console.log('alles gut')
