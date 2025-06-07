const {rental} = require('../models/rental');
const express =require('express');
const router = express.Router();

router.get(`/`, async (req,res)=>{
    const rentalList = await rental.find();

    if(!rentalList){
        res.status(500).json({
            success: false
        })
    }
    res.send(rentalList);
})

module.exports = router;