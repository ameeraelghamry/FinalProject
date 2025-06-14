const path = require('path')
const booked = require('../models/bookings');
const Car = require('../models/car');

const getAllCars = async (req, res) => {//veronia search bar
    try {
        const category = req.query.category;
        const search = req.query.search;
        const user = req.session.user;

        let filter = {};
        let message = '';

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

        let carList = await Car.find(filter);

        if (!carList || carList.length === 0) {
            message = `No cars found for "${search}". Showing all available cars instead.`;
            carList = await Car.find();
        }

    if(user?.Type === 'admin'){
         res.render('Admin/adminInventory', { cars: carList, search: search, message: message});
        console.log('i am admin')
      
      }
      else{
        res.render('Explore', { cars: carList, search: search, message: message });
        console.log('not admin')
     
}
    console.log("getAllCars route hit");//to see if the route hits currently the cars.find() bufferring times out

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

        const rentedCars = await booked.find({
           
            //checks for booked dates inside bookings model
            //startDate <= requestedEndDate AND endDate >= requestedStartDate, extra check for overlapping dates
            startDate: { $lte: end }, // less than or equal
            endDate: { $gte: start } //more than or equal
                
           
        }).select('carId');

        const rentedCarIds = rentedCars.map(r => r.carId);


        const filter = {
            _id: { $nin: rentedCarIds }, //not in
            city: city
        };
    
        const availableCars = await Car.find(filter);

        res.render('Explore', { cars: availableCars, search: city, message: null });
    
        //res.render('availableCars', { cars: availableCars }); //might need to be edited

       // res.json({ cars: availableCars }); // for testing

    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).send('Server error');
    }
}

const getform = async (req,res)=>{

    res.sendFile(path.join(__dirname, '..', 'views', 'AddCars.html'));
}

const addCar = async (req, res) => {//veronia
    const newcar = new Car({
        name: req.body.name,
        brand: req.body.brand,
        city: req.body.city,
        image: req.body.image,
        price: parseInt( req.body.price),
        miles: req.body.miles,
        category: req.body.category,
        available: req.body.available === 'true',
        featured: req.body.featured === 'true',
        seats: parseInt( req.body.seats),
        description : req.body.description,
        horsepower : req.body.horsepower,
        cylinders : req.body.cylinders,
        maxSpeed : req.body.maxSpeed,
        Model : req.body.Model,
        image2 : req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4,
        image5: req.body.image5


    })

    //save in database
    newcar
        .save()
        .then((createdCar) => {
            console.log('This is the created car:', createdCar);
            res.status(201).json(createdCar)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })
}
const editCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const updateData = {};
        
        // Get existing car first
        const existingCar = await Car.findById(carId);
        if (!existingCar) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        // List all possible fields (including optional ones)
        const allFields = [
            'name', 'brand', 'city', 'price', 'miles', 'category', 'seats',
            'available', 'featured', 'description', 'horsepower', 
            'cylinders', 'maxSpeed', 'Model',
            'image', 'image2', 'image3', 'image4', 'image5'
        ];

        // Process all fields
        allFields.forEach(field => {
            if (req.body[field] !== undefined) {
                // Convert empty strings to null, preserve other values
                updateData[field] = req.body[field] === null ? null : req.body[field];
            }
        });

        // Special handling for numbers and booleans
        if (updateData.price) updateData.price = Number(updateData.price);
        if (updateData.miles) updateData.miles = Number(updateData.miles);
        if (updateData.seats) updateData.seats = Number(updateData.seats);
        
        if (updateData.available !== undefined) {
            updateData.available = updateData.available === 'true';
        }
        if (updateData.featured !== undefined) {
            updateData.featured = updateData.featured === 'true';
        }

        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            updateData,
            { 
                new: true,
                runValidators: true,
                context: 'query' // This helps with update validation
            }
        );

        res.json({ success: true, data: updatedCar });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message,
            errors: error.errors
        });
    }
};



const getFeatured = async (req, res) => {
    try{
        const featured = await Car.find({featured: true});//fetching
        res.json({success: true, data: featured});
    } catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}
const tempStoreDates = async (req, res)=>{
req.session.rentalDates = {
  startDate: req.query.start,
  endDate: req.query.end,
  days: parseInt(req.query.days)

};
res.redirect (`/api/v1/cars/inside/${ req.session.selectedCar._id}`)

}

const getIndividualCar = async (req, res)=>{
    const user = req.session.user;
       try{
       const Carid = req.params.id;
               const individualCar = await Car.findById(Carid)
       if (!individualCar){
              return res.status(404).send('Car not found')
       }
       req.session.selectedCar = individualCar //store the selected car in session
        if(user?.Type === 'admin'){
            res.render('carPage', {car: individualCar});
            
        
      }
      else{
            res.render('cardetails', { car: individualCar , user: user , rentalDates: req.session.rentalDates});
        console.log(req.session.selectedCar.name)
      
    
       }


}
catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
module.exports = {
    editCar,
    addCar,
    searchByDate,
    getAllCars,
    getFeatured,
    tempStoreDates,
    getIndividualCar,
    getform
};