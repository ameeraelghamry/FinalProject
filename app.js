const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Product = require('./models/product')

require('dotenv/config')

//routers
const api = process.env.API_URL
const productsRoutes = require('./routers/products')
const categoriesRoutes = require('./routers/categories')
const userRoutes = require('./routers/users')
const rentalRoutes = require('./routers/rentals')

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny')) //good to display log requests


//main routes of products
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/rentals`, rentalRoutes)

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connection is ready...')
    })
    .catch((err) => {
        console.log(err)
    })

//listening port for server
app.listen(3000, () => {
    console.log('server is running on port 3000')
})
