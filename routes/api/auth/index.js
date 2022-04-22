const express = require('express')
const { 
    registration, 
    login, 
    logout, 
    current
} = require('../../../controllers/auth')
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')
const router = express.Router()
const guard = require('../../../middlewares/guard')

router.post('/users/signup', wrapperError(registration))
router.post('/users/login', wrapperError(login))
router.post('/users/logout', guard, wrapperError(logout))
router.post('/users/current', guard, wrapperError(current))

module.exports = router
