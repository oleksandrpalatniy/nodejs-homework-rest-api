const express = require('express')
const { 
    listContacts, 
    getContactById, 
    addContact, 
    removeContact, 
    updateContact, 
    updateStatusContact 
} = require('../../../controllers/contacts')

const {contactsSchema} = require('./contacts-validation-schem')
const {validate} = require('../../../middlewares/validation')
const {wrapper: wrapperError} = require('../../../middlewares/error-handler')

const guard = require('../../../middlewares/guard')
const router = express.Router()

router.get('/', guard, wrapperError(listContacts))

router.get('/:contactId', guard, wrapperError(getContactById))

router.post('/', guard, validate(contactsSchema), wrapperError(addContact))

router.delete('/:contactId', guard, wrapperError(removeContact))

router.put('/:contactId', guard, validate(contactsSchema), wrapperError(updateContact))

router.patch('/favorite/:contactId', guard, wrapperError(updateStatusContact))

module.exports = router
