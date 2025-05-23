const Car = require('../models/car')
const express = require('express');
const router = express.Router();


//now instead of app.get we use router.get
//routers for webpage
router.get(`/`, async (req, res) => {
    const carList = await Car.find();

    if(!carList){
        res.status(500).json({
            success: false
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