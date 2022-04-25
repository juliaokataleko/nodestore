const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../Models/Category")
const Category = mongoose.model('categories')

router.get('/', (req, res) => {
    res.render("admin/index")
})
router.get('/categories', async (req, res) => {
    let categories = await Category.find().sort({
        date: 'desc'
    });
    res.render("admin/categories", {
        categories
    })
})

router.post('/categories/store', async (req, res) => {

    let errors = []

    if (!req.body.name
        || req.body.name == undefined
        || req.body.name == null) {
        errors.push({ msg: "Por favor preencha o nome" })
    } else if (req.body.name.length < 2) {
        errors.push({ msg: "Nome muito curto" })
    }

    if (!req.body.status
        || req.body.status == undefined
        || req.body.status == null) {
        errors.push({ msg: "Por favor preencha o status" })
    }

    if (!req.body.slug
        || req.body.slug == undefined
        || req.body.slug == null) {
        errors.push({ msg: "Por favor preencha o slug" })
    } else if (req.body.slug.length < 2) {
        errors.push({ msg: "slug muito curto" })
    }

    if (errors.length > 0) {
        let has_errors = true
        let categories = await Category.find().sort({
            date: 'desc'
        });
        res.render("admin/categories", {
            errors,
            has_errors,
            categories
        })
    } else {
        const newCat = {
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            status: req.body.status
        }

        new Category(newCat).save().then(() => {
            req.flash("success_msg", "Categoria criada sucesso.")
            res.redirect("/admin/categories");
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria.")
            res.redirect("/admin/categories");
        })
    }

})

router.get('/categories/:id/show', async (req, res) => {
    let category = await Category.findOne({
        _id: req.params.id
    })

    res.render("admin/category-show", { category })
})

router.get('/categories/:id/edit', async (req, res) => {
    let category = await Category.findOne({
        _id: req.params.id
    })
    res.render("admin/category-edit", { category })
})

router.post('/categories/update/:id', async (req, res) => {

    let errors = []

    if (!req.body.name
        || req.body.name == undefined
        || req.body.name == null) {
        errors.push({ msg: "Por favor preencha o nome" })
    } else if (req.body.name.length < 2) {
        errors.push({ msg: "Nome muito curto" })
    }

    if (!req.body.status
        || req.body.status == undefined
        || req.body.status == null) {
        errors.push({ msg: "Por favor preencha o status" })
    }

    if (!req.body.slug
        || req.body.slug == undefined
        || req.body.slug == null) {
        errors.push({ msg: "Por favor preencha o slug" })
    } else if (req.body.slug.length < 2) {
        errors.push({ msg: "slug muito curto" })
    }

    if (errors.length > 0) {
        res.render("admin/categories", {
            errors
        })
    } else {
        const catData = {
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            status: req.body.status
        }

        let category = await Category.findOne({
            _id: req.params.id
        })

        if (category != null) {

            category.name = req.body.name;
            category.slug = req.body.slug;
            category.description = req.body.description;
            category.status = req.body.status;

            category.save().then(() => {
                req.flash("success_msg", "Categoria atualizada com sucesso.")
                res.redirect("/admin/categories");
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao salvar a categoria.")
                res.redirect("/admin/categories");
            })
        }

    }

})

router.post('/categories/:id/delete', async (req, res) => {

    Category.remove({
        _id: req.params.id
    }).then(() => {
        req.flash("success_msg", "Categoria excluída com sucesso.")
        res.redirect("/admin/categories");
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluir a categoria.")
        res.redirect("/admin/categories");
    })

})

// Products
router.get('/products', async (req, res) => {

    let categories = await Category.find().sort({
        date: 'desc'
    });

    res.render("admin/products/index", {categories})
})

// Export module
module.exports = router