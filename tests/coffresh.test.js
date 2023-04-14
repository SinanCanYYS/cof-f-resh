const request = require('supertest')
const User = require('../src/models/user')
// const Picnic = require('../src/models/picnic')

const app = require('../src/app')

describe('Coffresh', () => {
  beforeEach(async () => {
    await User.deleteMany()
  })

  it('can create a new user', async () => {
    const name = 'Sinan'
    const type = 'Customer'

    const expectedOutput = {
      name,
      type,
    }

    const actualOutput = await request(app).post('/users').send({ name, type })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })
})
