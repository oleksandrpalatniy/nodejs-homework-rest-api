const express = require('express')
const router = express.Router()
const { avatar } = require('../../../controllers/users')
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')
const guard = require('../../../middlewares/guard')
const upload = require('../../../middlewares/upload-avatar')


router.patch('/avatar', guard, upload.single('avatar'), wrapperError(avatar))

module.exports = router
