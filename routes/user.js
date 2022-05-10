const userRouter = require('express').Router()
const {
    getUser,
    createUser,
    showUser,
    updateUser,
    updateUserMail
} = require('../controllers/user_controller')

userRouter.get('/', getUser)
userRouter.post('/', createUser)
userRouter.get('/:user', showUser)
userRouter.put('/:user', updateUser)
userRouter.put('/:user/email', updateUserMail)

module.exports = userRouter