const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Página principal do Painel ADEMIR")
})

router.get('/products', (req, res) => {
    res.send("Página de produtos")
})

router.get('/categories', (req, res) => {
    res.send("Página de categorias")
})

// Export module
module.exports = router