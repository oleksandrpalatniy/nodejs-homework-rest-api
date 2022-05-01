const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const {HttpCode} = require('../../libs/constants')
const {CustomError} = require('../../middlewares/error-handler')
const SECRET_KEY = process.env.JWT_SECRET_KEY
const EmailService = require('../email/service')
// const SenderSendGrid = require('../email/senders/sendgrid-sender')
const SenderNodemailer = require('../email/senders/nodemailer-sender')
// const User = require('../../models/user')

class AuthService {
    async create(body) {
        const user = await Users.findByEmail(body.email)
        if (user) {
            throw new CustomError(HttpCode.CONFLICT, 'User already exists')
        }
        const newUser = await Users.create(body)
        const sender = new SenderNodemailer()
        const emailService = new EmailService(sender)
        try {
            await emailService.sendEmail(
                newUser.email,
                newUser.name,
                newUser.verifyToken,
            )
        } catch(error) {
            console.log(error)
        }

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
        }
    }

    async login ({email, password}) {
        const user = await this.getUser(email, password)
        if (!user) {
            throw new CustomError(HttpCode.UNAUTHORIZED, 'Invalid credentials')
        }

        const token = this.generateToken(user)
        await Users.updateToken(user.id, token)
        return {token}
    }

    async logout (id) {
        await Users.updateToken(id, null)
    }

    async getUser(email, password) {
        const user = await Users.findByEmail(email)
        if (!user) {
            return null
        }
        if (!(await user?.isValidPassword(password))) {
            return null
        }
        if(!user?.verify) {
            throw new CustomError(HttpCode.BAD_REQUEST, 'User not verified')
        }
        return user
    }

    async current(id) {
        const user = await Users.updateToken(id)
        return user
    }

    generateToken(user) {
        const payload = {id : user.id, name: user.name, role:user.role}
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
        return token
    }

    async verifyUser(token) {
        const user = await Users.findByToken(token)
        if (!user) {
            throw new CustomError(HttpCode.BAD_REQUEST, `Invalid token!`)
        }
        if (user && user.verify) {
            throw new CustomError(HttpCode.BAD_REQUEST, 'User already verified!')
        }
        await Users.verifyUser(user.id)
        return user
    }

    async reverifyUser(email) {
        const user = await Users.findByEmail(email)
        if (!user) {
            throw new CustomError(HttpCode.BAD_REQUEST, 'User with email not foundrs')
        }
        if (user && user.verify) {
            throw new CustomError(HttpCode.BAD_REQUEST, 'User already verified!')
        }
    
    const sender = new SenderNodemailer()
    const emailService = new EmailService(sender)
    try {
      await emailService.sendEmail(user.email, user.name, user.verifyToken)
    } catch (error) {
      console.log(error)
      throw new CustomError(
        HttpCode.SERVICE_UNAVAILABLE,
        'Error sending email',
      )
    }
}
}

module.exports = new AuthService()