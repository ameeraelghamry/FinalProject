const Product = require('../models/product')
const express = require('express');
const router = express.Router();


//now instead of app.get we use router.get
//routers for webpage
router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if(!productList){
        res.status(500).json({
            success: false
        })
    }
    res.send(productList);
})

router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        miles: req.body.miles,
    })

    //save in database
    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })
})

//exporitng a module
module.exports = router;