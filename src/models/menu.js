const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  name: String,
  type: String,
  subType: String,
  price: Number,
  recipe: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
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
module.exports = mongoose.model('MenuItem', menuItemSchema)
