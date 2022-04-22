const jwt = require('jsonwebtoken')
const Users = require('../repository/users')
const {HttpCode} = require('../libs/constants')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const guard = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1]
    if (!verifyToken(token)) {
        return res.status(HttpCode.UNAUTHORIZED).send({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Not authorized',
        })
    }
    const payload = jwt.decode(token)
    const user = await Users.findById({_id: payload.id})
    if (!user || user.token !== token) {
        return res.status(HttpCode.UNAUTHORIZED). send({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Not authorized',
        })
    }
    req.user = user
    next()
} 

const verifyToken = (token) => {
    try {
        const t = jwt.verify(token, SECRET_KEY)
        return !!t
    } catch (error) {
        return false
    }
}

module.exports = guard
