const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: 'Basic'
    },
    name: {
        type: String,
        minlength: 5,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 6,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    meta: String,
    address: {
        number: String,
        street: String,
        city: String,
        state: String,
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)