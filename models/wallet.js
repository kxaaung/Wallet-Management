const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: 0
    },
    deposits: [
        {
            amount: Number,
            deposited_at: Date,
        }
    ]
})

walletSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Wallet', walletSchema)