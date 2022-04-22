const Contacts = require('../../repository/contact')
const {HttpCode} = require('../../libs/constants')
const {CustomError} = require('../../middlewares/error-handler')
// const Contact = require('../../models/contact')
// const { find } = require('../../models/user')
// const SECRET_KEY = process.env.JWT_SECRET_KEY

class ContactsService {
    async getAll(querry, user) {
        const contacts = await Contacts.listContacts(querry, user)
        return contacts        
    }

    async getById (id, user) {
        const contact = await Contacts.getContactById(id, user)
        if (!contact) {
            throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
        }
        return contact
    }

    async create (body, user) {
        const contact = await Contacts.addContact(body, user)
        return contact
    }

    async update(id, body, user) {
        const contact = await Contacts.updateContact(id, body, user)
        if (!contact) {
            throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
        }
        return contact
    }

    async remove(id, user) {
        const contact = await Contacts.removeContact(id, user)
        if (!contact) {
            throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
        }
        return contact
    }

}

module.exports = new ContactsService()