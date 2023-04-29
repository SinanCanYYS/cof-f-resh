const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Connected to MongoDB', process.env.MONGODB_CONNECTION_STRING))
  .catch((err) => console.error('Could not connect to MongoDB...', err))
