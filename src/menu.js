class MenuItem {
  recipe = []
  constructor(restaurant, name, type, subType, price) {
    this.restaurant = restaurant
    this.name = name
    this.type = type
    this.subType = subType
    this.price = price
  }

  get recipeDetails() {
    return `${this.name} recipe:
      ${this.recipe.map(line => {
        return `
            ${line.quantity} ${line.ingredient.unit} ${line.ingredient.name}`
      })}`
  }
}

module.exports = MenuItem
