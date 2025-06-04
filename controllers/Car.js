const Car = require('../models/car');
const Rental = require('../models/rental');

const getAllCars = async (req, res) => {//veronia
    const category = req.query.category;
    const search = req.query.search;
    
    let filter = {};
    
    if(category){
        filter.category = category;
    }
    
    if(search){
    const words = search.trim().toLowerCase().split(/\s+/); 
    
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
}

const searchByDate = async (req, res) => {//veronia
     const {startDate, endDate, city } = req.query;
    
        //making date objects mongodb saves dates as objects
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const rentedCars = await Rental.find({
            $or:[
    
                //startDate <= requestedEndDate AND endDate >= requestedStartDate
                {startDate: {$lte: end}, 
                endDate: {$gte: start}
                }
            ]
        }).select('product');
    
        const rentedCarIds = rentedCars.map(r => r.product);
    
        
        const filter = {
          _id: { $nin: rentedCarIds },
          city: city
        };
    
        const availableCars = await Car.find(filter);
    
        res.json(availableCars);
}


const addCar = async (req, res) => {//veronia
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
}

const editCar = async (req, res) =>{//veronia
    try {
        const updatedCar = await Car.findByIdAndUpdate(
          req.params.id,      
          req.body,           
          { new: true }      
        );
    
        if (!updatedCar) {
          return res.status(404).json({ success: false, message: 'Car not found' });
        }
    
        res.json({ success: true, data: updatedCar });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
}

module.exports = {
    editCar,
    addCar,
    searchByDate,
    getAllCars
};