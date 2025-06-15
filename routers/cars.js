const express = require('express');
const router = express.Router();

const carController = require('../controllers/Car');

//now instead of app.get we use router.get
//routers for webpage
router.get('/cars', carController.getAllCars);//handles browse cards heroku

router.get('/inside/:id', carController.getIndividualCar);//handles individual car page

router.get('/store-dates', carController.tempStoreDates); //stores the dates set by the user in session then redirects to the cardetails page

//featured cars api
router.get('/featured', carController.getFeatured);

//search bar
router.get(`/search`, carController.getAllCars);

router.get('/AddCars',carController.getform);

//adding a new car
router.post('/',carController.addCar);

//for editing cars
router.put('/inside/:id', carController.editCar)

//connecting to frontend 
//in script frontend when button is clicked it gathers the info and renders/avaialable which is in this route
//calls search by date in controllers so it performs the filtering function
router.get('/available', carController.searchByDate);

//exporitng a module
module.exports = router;