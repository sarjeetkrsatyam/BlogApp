const express = require('express')
const { getAllUsers, registerContoller, loginController } = require('../controllers/userController')

// router object

const router = express.Router()
// GET ALL USERS || GET
router.get('/all-users', getAllUsers)

// CREATE USER || POST
router.post('/register', registerContoller)

// LOGN || POST
router.post('/login', loginController)

module.exports = router