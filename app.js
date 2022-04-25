// load modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
const adminRoutes = require('./Routes/admin')
const path = require('path')

// Configs
// Template Engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// session
app.use(session({
    secret: 'nodestore_code',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())

// middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

// public path
app.use(express.static(path.join(__dirname, "public")))

// Mongoose
mongoose.connect("mongodb://localhost/nodestore_bd").then(() => {
    console.log("Conexão feita...");
}).catch((err) => {
    console.log(`Erro ao se conectar: ${err}`);
})

// Routes
app.get('/', (req, res) => {
    res.render("index")
})

app.use('/admin', adminRoutes)



// Others
const PORT = 8081
app.listen(PORT, () => {
    console.log("Server running!");
})