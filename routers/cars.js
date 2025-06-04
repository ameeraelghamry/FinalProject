const express = require('express');
const router = express.Router();
const Car = express.Router();

const Car = require('../controllers/Car');

//now instead of app.get we use router.get
//routers for webpage

//search bar
router.get(`/`,Car.getAllCars);

//filtering by date search form
router.get('/available', Car.searchByDate);


//adding a new car
router.post(`/add`,Car.addCar);

//for editing cars
router.put('/edit/:id', Car.updateCar)
//exporitng a module
module.exports = router;