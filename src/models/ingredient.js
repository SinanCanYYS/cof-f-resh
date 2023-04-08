const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
  name: String,
  type: String,
  unit: String,
})

class Ingredient {
  // constructor(restaurant, name, type, unit) {
  //   this.restaurant = restaurant
  //   this.name = name
  //   this.type = type
  //   this.unit = unit
  // }
}

ingredientSchema.loadClass(Ingredient)
module.exports = mongoose.model('Ingredient', ingredientSchema)
// module.exports = Ingredient
