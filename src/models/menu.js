const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const menuItemSchema = new mongoose.Schema({
  name: String,
  type: String,
  subType: String,
  price: Number,
  recipe: {
    type: [
      {
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', autopopulate: { maxDepth: 1 } },
        quantity: Number,
      },
    ],
    default: [],
  },
})

class MenuItem {
  // recipe = []
  // constructor(restaurant, name, type, subType, price) {
  //   this.restaurant = restaurant
  //   this.name = name
  //   this.type = type
  //   this.subType = subType
  //   this.price = price
  // }

  get recipeDetails() {
    return `${this.name} recipe:
      ${this.recipe.map(line => {
        return `
            ${line.quantity} ${line.ingredient.unit} ${line.ingredient.name}`
      })}`
  }
}

// module.exports = MenuItem
menuItemSchema.loadClass(MenuItem)
menuItemSchema.plugin(autopopulate)
module.exports = mongoose.model('MenuItem', menuItemSchema)
