// load modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const app = express()
const adminRoutes = require('./Routes/admin')

// Configs
// Template Engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/admin', adminRoutes)



// Others
const PORT = 8081
app.listen(PORT, () => {
    console.log("Server running!");
})