const mongoose = require('mongoose')
/*{
    "name" : "Hakka Noodles",
    "price" : 180,
    "taste" : "spicy",
    "isDrink" : false,
    "ingredients" : ["noodles", "cheese", "hakka masala", "sauce"],
    "noOfSales" : 91
}*/
const menuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required : true
    },
    taste: {
        type: String,
        enum: ["sweet", "spicy", "salty", "sour"],
        required : true
    },
    IsDrink : {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],// array of strings
        default : []
    },
    noOfSales: {
        type: Number,
        default: 0
    }
})

const menuItem = mongoose.model('MenuItem', menuItemSchema)
module.exports = menuItem