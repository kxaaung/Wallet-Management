const Wallet = require('../models/wallet')

// Get Wallet List
const getWallet = async (req, res) => {
    const wallets = await Wallet.find({})

    res.json({
        meta: {
            total: wallets.length
        },
        data: wallets
    })
}

// Deposit to wallet
const depositWallet = async (req, res) => {
    const id = req.params.wallet
    const body = req.body

    const wallet = await Wallet.findById(id)

    if(!wallet) {
        return res.json({
            error: 'wallet not found'
        })
    }

    const deposit = {
        amount: body.amount,
        deposited_at: new Date()
    }
    const deposits = wallet.deposits.concat(deposit)

    const balance = parseInt(body.amount) + parseInt(wallet.balance)
     
    const updatedWallet = await Wallet.findByIdAndUpdate(id, { 
        balance,
        deposits
    }, { new: true })

    res.json({
        data: updatedWallet
    })
}

//  Delete wallet with balance = 0
const destoryWallet = async (req, res) => {
    const id = req.params.wallet

    const wallet = await Wallet.findById(id)

    if(parseInt(wallet.balance) !== 0) {
        return res.status(400).json({
            error: "wallet's balance is not empty"
        })
    }
    
    await Wallet.findByIdAndRemove(id)

    res.status(204).end()
}

module.exports = {
    depositWallet,
    getWallet,
    destoryWallet
}