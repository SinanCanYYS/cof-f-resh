class MenuItem {
  recipe = []
  constructor(restaurant, name, type, subType, price) {
    this.restaurant = restaurant
    this.name = name
    this.type = type
    this.subType = subType
    this.price = price
  }

  get Recipe() {
    return (
      `${this.name} recipe:` +
      this.recipe
        .map(line => {
          return `
          ${line.quantity} ${line.ingredient.unit} ${line.ingredient.name}`
        })
        .join('')
    )
  }
}

module.exports = MenuItem
