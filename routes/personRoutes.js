const express = require('express')
const router = express.Router()

const person = require('./../models/person')

router.post('/', async (req, res) => {
    try{
            const data = req.body
            const newPerson = new person(data);
            const savedPerson = await newPerson.save()
            console.log("Data saved")
            res.status(200).json(savedPerson)
        }catch(err) {
            console.log(err)
            res.status(2500).json({error: "Internal Server Error"})
        }
})

router.get('/', async (req, res) => {
    try{
        const data = await person.find()// return all records present in person collection
        console.log("Data fetched")
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if(workType  == "manager" || workType  == "waiter" || workType  == "chef") {
            const response = await person.find({work: workType})
            console.log("Response fetched")
            res.status(200).json(response)
        }else {
            res.status(404).json({error: "Invalid Work type"})
        }
    }catch(err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
}) 

// update
router.put('/:personId', async (req, res) => { //personId -> representing the unique id provided by mongodb -> _idz
    try {
        // client will send the id through parameter, which is taken through variable personId
        const personId = req.params.personId; // extract the id from the url parameter
        // the endpoint variable and this req.params.<variable> needs to be same
        const updatedPersonData = req.body; // data of that id is sent through json in body
        // id -> through paramater
        // data to be updated -> through body

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            // after update
            new : true, // Return the updated document
            // before update
            runValidators: true // run mongoose validation
        })

        // 3 cases - success(updation done)(in try block), failure (in catch block), no data is present for the given personId
        // 3rd case
        if(!response) {
            return res.status(404).json({error: "Person not found"})
        }
        console.log("Data updated") 
        res.status(200).json(response)
    }catch(err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
})

// delete
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id
        const response = await person.findByIdAndDelete(personId)
        if(!response) {
            return res.status(404).json({error: "Person not found"})
        }
        console.log("Data deleted")
        res.status(200).json({msg: 'Person Deleted Successfully'})
    }catch(err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
})

// instead of writing person again and again in every endpoint, remove here and  while importing in server.js we write onetime '/person'

module.exports = router