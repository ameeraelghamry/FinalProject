const Car = require('../models/car');
const Rental = require('../models/bookings');

const getAllCars = async (req, res) => {//veronia search bar
    try {
        const category = req.query.category;
        const search = req.query.search;

        let filter = {};

        if (category) {
            //case insensitive
            filter.category = { $regex: category, $options: 'i' };
        }

        if (search) {
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

        if (!carList || carList.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No cars found'
            })
        }

    //res.send(carList);// for testing

    res.render('Admin/adminInventory', { cars: carList, search: search });//might need to be edited


    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).send('Server error');
    }
}

const searchByDate = async (req, res) => {//veronia

    try {
        const { startDate, endDate, city } = req.query;//extract them from the url sent

        //making date objects mongodb saves dates as objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        const rentedCars = await Rental.find({
            $or: [

                //startDate <= requestedEndDate AND endDate >= requestedStartDate
                {
                    startDate: { $lte: end },
                    endDate: { $gte: start }
                }
            ]
        }).select('product');

        const rentedCarIds = rentedCars.map(r => r.product);


        const filter = {
            _id: { $nin: rentedCarIds },
            city: city
        };
    
    //    const availableCars = await Car.find(filter);// this line is a duplicate of line 29,
    
        //res.render('availableCars', { cars: availableCars }); //might need to be edited

       // res.json({ cars: availableCars }); // for testing

    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).send('Server error');
    }
}


const addCar = async (req, res) => {//veronia
    const newcar = new Car({
        name: req.body.name,
        brand: req.body.brand,
        city: req.body.city,
        image: req.body.image,
        price: req.body.price,
        miles: req.body.miles,
        category: req.body.category,
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

const editCar = async (req, res) => {//veronia
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

const getFeatured = async (req, res) => {
    try{
        const featured = await Car.find({featured: true});//fetching
        res.json({success: true, data: featured});
    } catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    editCar,
    addCar,
    searchByDate,
    getAllCars,
    getFeatured
};