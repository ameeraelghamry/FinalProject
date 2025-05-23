const Car = require('../models/car')
const express = require('express');
const router = express.Router();


//now instead of app.get we use router.get
//routers for webpage
router.get(`/`, async (req, res) => {
    const category = req.query.category;
    const search = req.query.search;

    let filter = {};

    if(category){
        filter.category = category;
    }

    if(search){
        filter.$or = [
            {name: {$regex: search, $options: 'i'}},
            {brand: {$regex: search, $options: 'i'}},
            {city: {$regex: search, $options: 'i'}},
            {category: {$regex: search, $options: 'i'}}
        ];
    }

    const carList = await Car.find(filter);

    if(!carList){
        res.status(500).json({
            success: false,
            message: 'No cars found'
        })
    }
    res.send(carList);
})

router.post(`/`, (req, res) => {
    const newcar = new Car({
        name:  req.body.name,
        brand:  req.body.brand,
        city:  req.body.city,
        image:  req.body.image,
        price: req.body.price,
        miles:  req.body.miles,
        category:  req.body.category,
    })

    //save in database
    newcar
        .save()
        .then((createdCar) => {
            res.status(201).json(createdCar)
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