const User = require('../models/user')
const Wallet = require('../models/wallet')
const bcrypt = require('bcrypt')

const searchGoogle = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('google');
    }, 4 * 1000);

});

const searchYahoo = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('yahoo');
    }, 2 * 1000);
});

const searchBing = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('bing');
    }, 1 * 1000);
});

// Get User List populate with wallet
const getUser = async (req, res) => {
    const users = await User.find({}).populate('wallet')

    res.json({
        meta: {
            total: users.length
        },
        data: users
    })
}

// Create User
const createUser = async (req, res) => {
    const body = req.body
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    // create wallet for user
    const newWallet = new Wallet({})
    const wallet = await newWallet.save()

    const newUser = new User({
        role: body.role,
        name: body.name,
        email: body.email,
        passwordHash,
        wallet: wallet._id,
        address: body.address,
    })

    const user = await newUser.save()

    res.json({
        data: user
    })
}

// Get User by id
const showUser = async (req, res) => {
    const id = req.params.user
    const user = await User.findById(id)
    if(!user) {
        return res.status(400).json({
            error: 'user not found'
        })
    }

    res.json({
        meta: {
            id
        },
        data: user
    })
}

// Update User data by id
const updateUser = async (req, res) => {
    const id = req.params.user
    const body = req.body
    const address = body.address || {}

    const user = {
        name: body.name,
        'address.number': address.number,
        'address.street': address.street,
        'address.city': address.city,
        'address.state': address.state,
    }

    const updatedUser = await User.findByIdAndUpdate(id, user, {new: true})

    res.json({
        data: updatedUser
    })
}


// Update the email of user
const updateUserMail = async (req, res) => {
    const id = req.params.user
    const email = req.body.email
    
    const value = await Promise.all([searchGoogle, searchYahoo, searchBing])
    const meta = value.join("_")

    const updatedUser = await User.findByIdAndUpdate(id, {
        email,
        meta
    }, {new: true})

    res.json({
        data: updatedUser
    })
}

module.exports = {
    getUser,
    createUser,
    showUser,
    updateUser,
    updateUserMail
}