const mongoose = require('mongoose')
const brcypt = require('bcrypt')

// define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['manager','waiter','chef'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

// pre is triggered just before save to db
// next -> now save to db
personSchema.pre('save', async function(next) {
    const person = this
    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next()
    try {
        // hash password generation
        const salt = await brcypt.genSalt(10) // bigger the number, more complex salt

        // hash password
        const hashedPassword = await brcypt.hash(person.password, salt)

        person.password = hashedPassword
        next()
    } catch (err) {
        return next(err)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await brcypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (err) {
        throw err
    }
}

/**
 * WHAT WE THINK
 * jay123 -> jhguyfdtyxghhchuyfyuryuruy
 * login -> 87fgvhg(entered password)
 * jhguyfdtyxghhchuyfyuryuruy -> jay123 -> then compare
 * 
 * ACTUAL WORKING
 * jhguyfdtyxghhchuyfyuryuruy -> extract salt
 * salt + 87fgvhg -> hash -> hfhgvjhguydgchjbgiugyufgc
 */

// define perosn model
const person = mongoose.model('person', personSchema)
module.exports = person