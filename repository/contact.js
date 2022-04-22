const Contact = require('../models/contact')


const listContacts = async (querry, user) => {
  console.log('repo contact', querry)
  const result = await Contact.find({owner: user.id})
  return result
}

const getContactById = async (contactId, user) => {
    const result = await Contact.findOne({_id: contactId, owner: user.id})
    return result
  }

const removeContact = async (contactId, user) => {
  const result = await Contact.findOneAndRemove({_id: contactId, owner: user.id})
  return result
}

const addContact = async (body, user) => {
  const result = await Contact.create({...body, owner: user.id})
  return result
}

const updateContact = async (contactId, body, user) => {
  const result = await Contact.findByIdAndUpdate(
      {_id: contactId, owner: user.id},
      {...body},
      {new: true},
  )
  return result
}

const updateStatusContact = async (contactId, body) => {
    const result = await Contact.findByIdAndUpdate(
        {_id: contactId},
        {...body},
        {new: true},
    )
    return result
  }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
