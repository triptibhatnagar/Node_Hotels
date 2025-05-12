const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const person = require('./models/person')

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // req.body
const PORT = process.env.PORT || 3000;

// Middleware function - Imagine you want to log every request made to your "Node Hotel" application, you can use middleware for this
const logReq = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)// 11/5/2025, 7:56:08 pm Request made to : /
    next() // move on to next phase
    // if you remove next(), logging will take place but it can't go to server and can't further process the response, it gets stuck in middleware
}

// const person = require('./models/person') //now exporting person in personRoutes
// const menuItem = require('./models/menuItem') //now exporting menuItem in menuItemRoutes

// to implement logReq to all endpoints
app.use(logReq)

passport.use(new localStrategy(// verification function
    async (USERNAME, PASSWORD, done) => {
        // authentication logic here
        try {
            console.log("Received credentials: ", USERNAME, PASSWORD)
            const user = await person.findOne({username: USERNAME})
            if(!user)
                // done -> (error, user, info)
                return done(null, false, {message: 'Incorrect username'})
            const isPasswordMatch = user.password === PASSWORD ? true : false;
            if(isPasswordMatch) {
                return done(null, user)
            }else {
                return done(null, false, {message: 'Incorrect password'})
            }
        }catch(err) {
            return done(err)
        }
    }
))

app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/', localAuthMiddleware, function(req, res) {
    res.send("Hello World")
})


// app.get('/idli', function(req, res) {
//     // res.send("Hello World - Your IDLI is made")
//     var customizedIdli = {
//         name : "rava-idli",
//         price: 120,
//         isChutney : true
//     }
//     res.send(customizedIdli);
// })
// app.get('/pizza', function(req, res) {
//     res.send("Hello World - Your PIZZA is made")
// })
// app.post('/menu', (req, res) => {
//     // console.log("data is saved")
//     res.send("data is saved")
// })
// app.post('/items', (req, res) => {
//     // console.log("data is saved")
//     res.send("data of items is saved")
// })

// HOW TO SEND AND SAVE DATA TO SERVER
// POST route to add a person
// app.post('/person', async (req, res) => {
    /*
    const data = req.body // Assuming the request body contains the person data
    // Create a new person document using the Mongoose module
    
    // const newPerson = new person();
    // newPerson.name = data.name;
    // newPerson.work = data.work;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.salary = data.salary;
    // newPerson.age = data.age;
    // newPerson.address = data.address;
    // quite complex
    
    const newPerson = new person(data);

    // Save the new person to the database
    newPerson.save((error, savedperson) => {
        if(error) {
            console.log("Error on saving person data:", error)
            // what user will see in response if error occurs
            // on data transfer, server sent a status code to know whether a specific request has been completed or not
            // different codes are there
            // 500 - server error responses 
            res.status(500).json({error: 'Internal server error'})
        }else {
            console.log("Data saved successfully")
            // 200 - successful responses
            res.status(200).json(savedperson)
        }
    })
    // MongooseError: Model.prototype.save() no longer accepts a callback
    */

    // using async, await
//     try{
//         const data = req.body
//         const newPerson = new person(data);
//         const savedPerson = await newPerson.save()
//         console.log("Data saved")
//         res.status(200).json(savedPerson)
//     }catch(err) {
//         console.log(err)
//         res.status(2500).json({error: "Internal Server Error"})
//     }
// })

// above post method moved to personRoutes.js

// HOW TO GET DATA FROM SERVER
// GET method to get the person
// app.get('/person', async (req, res) => {
//     try{
//         const data = await person.find()// return all records present in person collection
//         console.log("Data fetched")
//         res.status(200).json(data)
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Internal Server Error"})
//     }
// })

// above get method moved to personRoutes.js

// app.post('/menuItem', async (req, res) => {
//     try{
//         const data = req.body
//         const newItem = new menuItem(data);
//         const savedItem = await newItem.save()
//         console.log("Data saved")
//         res.status(200).json(savedItem)
//     }catch(err) {
//         console.log(err)
//         res.status(500).json({error: "Internal Server Error"})
//     } 
// })

// app.get('/menuItem', async (req, res) => {
//     try{
//         const data = await menuItem.find()// return all records present in person collection
//         console.log("Data fetched")
//         res.status(200).json(data)
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Internal Server Error"})
//     }
// })

// app.get('/person/:workType', async (req, res) => {
//     try {
//         const workType = req.params.workType;
//         if(workType  == "manager" || workType  == "waiter" || workType  == "chef") {
//             const response = await person.find({work: workType})
//             console.log("Response fetched")
//             res.status(200).json(response)
//         }else {
//             res.status(404).json({error: "Invalid Work type"})
//         }
//     }catch(err) {
//         console.log(err)
//         res.status(500).json({error: "Internal Server Error"})
//     }
// }) 

// above get method moved to personRoutes.js

// import the router files 
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

// use the routers
app.use('/person', personRoutes)
app.use('/menuItem', menuItemRoutes)

app.listen(PORT, () => console.log("Listening on port no 3000"))