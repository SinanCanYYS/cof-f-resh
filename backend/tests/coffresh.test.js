const request = require('supertest')
const User = require('../src/models/user')
const Restaurant = require('../src/models/restaurant')
//const Order = require('../src/models/order')

const app = require('../src/app')

describe('Coffresh', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Restaurant.deleteMany()
  })

  it('can create a new user', async () => {
    const name = 'Yesim'
    const type = 'Customer'

    const expectedOutput = {
      name,
      type,
    }

    const actualOutput = await request(app).post('/users').send({ name, type })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('can create a new Restaurant', async () => {
    const name = 'Yasemin Can'
    const type = 'Owner'

    const user = await request(app).post('/users').send({ name, type })

    const restaurantName = 'Coffee Sapiens'
    const city = 'Istanbul'
    const district = 'Nisantasi'
    const menu = []
    const ingredients = []
    const orderList = []
    const sales = []
    const stockQty = []
    const purchases = []

    const expectedOutput = {
      name: restaurantName,
      owner: user.body,
      city,
      district,
      menu,
      ingredients,
      orderList,
      sales,
      stockQty,
      purchases,
    }

    const actualOutput = await request(app)
      .post('/restaurants')
      .send({ name: restaurantName, owner: user.body._id, city, district })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('can create a new Menu Item', async () => {
    const name = 'Yasemin Can'
    const type = 'Owner'

    const user = await request(app).post('/users').send({ name, type })

    const restaurantName = 'Joy Coffee'
    const city = 'Istanbul'
    const district = 'Bebek'
    const menu = []
    const ingredients = []
    const orderList = []
    const sales = []
    const stockQty = []
    const purchases = []

    const restaurant = await request(app)
      .post('/restaurants')
      .send({ name: restaurantName, owner: user.body._id, city, district })

    const menuItemName = 'Cappuccino'
    const price = 10
    const menuItemtype = 'Drink'
    const subType = 'Hot Drink'
    const recipe = []

    const expectedOutput = {
      name: menuItemName,
      price,
      type: menuItemtype,
      subType,
      recipe,
    }

    const actualOutput = await request(app)
      .post(`/restaurants/${restaurant.body._id}/menu-items`)
      .send({ user: user.body._id, name: menuItemName, price, type: menuItemtype, subType, recipe })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('can create a new Ingredient', async () => {
    const name = 'Mauro Icardi'
    const userType = 'Owner'

    const user = await request(app).post('/users').send({ name, type: userType })

    const restaurantName = 'Petra'
    const city = 'Istanbul'
    const district = 'Besiktas'
    // const menu = []
    // const ingredients = []
    // const orderList = []
    // const sales = []
    // const stockQty = []
    // const purchases = []

    const restaurant = await request(app)
      .post('/restaurants')
      .send({ name: restaurantName, owner: user.body._id, city, district })

    const ingredientName = 'Milk'
    const ingredientType = 'Consumable'
    const unit = 'Litre'

    const expectedOutput = {
      name: ingredientName,
      type: ingredientType,
      unit,
    }

    const actualOutput = await request(app)
      .post(`/restaurants/${restaurant.body._id}/ingredients`)
      .send({ user: user.body._id, name: ingredientName, type: ingredientType, unit })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('can create a new Order', async () => {
    const ownerName = 'Dries Mertens'
    const ownerType = 'Owner'

    const user = await request(app).post('/users').send({ name: ownerName, type: ownerType })

    const customerName = 'Juan Mata'
    const customerType = 'Customer'

    const customer = await request(app).post('/users').send({ name: customerName, type: customerType })

    const restaurantName = 'Big Mammas'
    const city = 'Tekirdag'
    const district = 'Merkez'

    const restaurant = await request(app)
      .post('/restaurants')
      .send({ name: restaurantName, owner: user.body._id, city, district })

    const orderType = 'Take Away'
    const status = 'pending'
    const targetDate = '09.09.2023'
    const notes = 'please hurry up'

    const expectedOutput = {
      customer: customer.body,
      restaurant: restaurant.body,
      orderType,
      status,
      totalCost: 0,
      items: [],
      targetDate,
      notes,
    }

    const actualOutput = await request(app).post('/orders').send({
      customer: customer.body._id,
      restaurant: restaurant.body._id,
      type: orderType,
      targetDate,
      notes,
    })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })
})

console.log('test pitti')
