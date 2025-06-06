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

//connecting to frontend 
//in script frontend when button is clicked it gathers the info and renders/avaialable which is in this route
//calls search by date in controllers so it performs the filtering function
router.get('/available', searchByDate);

//exporitng a module
module.exports = router;