const contactsRepository = require('../../repository/contact')
const contactsService = require('../../services/contacts')
const HttpCode = require('../../libs/constants')

const listContacts = async (req, res) => {
    const contacts = await contactsService.getAll(req.querry, req.user)
    res.json({ 
      status: 'success', 
      code: HttpCode.OK, 
      payload: {contacts} 
    })
  }

  const getContactById = async (req, res) => {
    const contact = await contactsService.getById(req.params.contactId, req.user)
    return res.json({ 
      status: 'success', 
      code: HttpCode.OK, 
      payload: {contact} })
  }
  
  const addContact = async (req, res) => {
    const contact = await contactsService.create(req.body, req.user)
    res.status(201).json({ 
      status: 'success', 
      code: HttpCode.CREATED, 
      payload: {contact} })
  }
  
  const removeContact = async (req, res) => {
    const contact = await contactsService.remove(req.params.contactId, req.user)
      return res.json({ 
        status: 'success', 
        code: HttpCode.OK, 
        payload: {contact},
        message: 'Contact deleted' 
      })
  }
  
  const updateContact = async (req, res) => {
    const contact = await contactsService.update(req.params.contactId, req.body, req.user)
       return res.json({ 
         status: 'success', 
         code: HttpCode.OK, 
         payload: {contact} 
        })
    }

  const updateStatusContact = async (req, res) => {
    const contact = await contactsRepository.updateContact(req.params.contactId, req.body)
    
    if (req.body.favorite === undefined) {
        return res.json({status: 'error', code: 400, message: 'missing field favorite'})
    } else
    if (contact) {
      return res.json({ status: 'success', code: 200, payload: {contact} })
    }
    return res
    .status(404)
    .json({ status: 'error', code: 404, message:'Not found' })
  }
  
 module.exports = {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact}