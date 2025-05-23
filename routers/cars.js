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
       const words = search.trim().toLowerCase().split(/\s+/); // split by spaces

        filter.$and = words.map(word => ({
            $or: [
                { name: { $regex: word, $options: 'i' } },
                { brand: { $regex: word, $options: 'i' } },
                { category: { $regex: word, $options: 'i' } },
                { city: { $regex: word, $options: 'i' } }
            ]
        }));
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