const walletRouter = require('express').Router()
const {
    depositWallet,
    getWallet,
    destoryWallet
} = require('../controllers/wallet_controller')


walletRouter.put('/deposit/:wallet', depositWallet)
walletRouter.get('/', getWallet)
walletRouter.delete('/:wallet', destoryWallet)

module.exports = walletRouter