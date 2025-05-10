const express = require('express')
const router = express.Router()
const menuItem = require('./../models/menuItem')

router.post('/', async (req, res) => {
    try{
        const data = req.body
        const newItem = new menuItem(data);
        const savedItem = await newItem.save()
        console.log("Data saved")
        res.status(200).json(savedItem)
    }catch(err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    } 
})

router.get('/', async (req, res) => {
    try{
        const data = await menuItem.find()// return all records present in person collection
        console.log("Data fetched")
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'salty' || tasteType == 'sour') {
            const response = await menuItem.find({taste: tasteType})
            console.log("Response fetched")
            res.status(200).json(response)
        }
    }catch(err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
}) 

module.exports = router