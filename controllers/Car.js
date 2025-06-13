const booked = require('../models/bookings');

const getAllCars = async (req, res) => {//veronia search bar
    try {
        const category = req.query.category;
        const search = req.query.search;
        const user = req.session.user;

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

        const carList = await CarModel.find(filter);

        if (!carList || carList.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No cars found'
            })
        }

    //res.send(carList);// for testing
      if(user?.Type === 'client'){
        res.render('explore', { cars: carList, search: search });
      }
      else{
    res.render('Admin/adminInventory', { cars: carList, search: search });
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
    
        const availableCars = await CarModel.find(filter);

        res.render('Admin/adminInventory', { cars: availableCars, search: city });
    
        //res.render('availableCars', { cars: availableCars }); //might need to be edited

       // res.json({ cars: availableCars }); // for testing

    } catch (error) {
        console.error('Error searching cars:', error);
        res.status(500).send('Server error');
    }
}


const addCar = async (req, res) => {//veronia
    const newcar = new CarModel({
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
        const updatedCar = await CarModel.findByIdAndUpdate(
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
        const featured = await CarModel.find({featured: true});//fetching
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
               const individualCar = await CarModel.findById(Carid)
       if (!individualCar){
              return res.status(404).send('Car not found')
       }
       req.session.selectedCar = individualCar //store the selected car in session
        if(user?.Type === 'client'){
        res.render('cardetails', { car: individualCar , user: user , rentalDates: req.session.rentalDates});
      }
      else{
    res.send('carPage');
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
    getIndividualCar
};