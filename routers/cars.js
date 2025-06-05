const express = require('express');
const router = express.Router();
const Car = express.Router();

const carController = require('../controllers/Car');

//now instead of app.get we use router.get
//routers for webpage

//search bar
router.get(`/`, carController.getAllCars);

//filtering by date search form
router.get('/available', carController.searchByDate);

//adding a new car
router.post(`/add`,carController.addCar);

//for editing cars
router.put('/edit/:id', carController.editCar)
//exporitng a module
module.exports = router;