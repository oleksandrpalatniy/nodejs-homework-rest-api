const authService = require('../../services/auth')
const {HttpCode} = require('../../libs/constants')

const registration = async (req, res) => {
    const user = await authService.create(req.body)
    return res
    .status(HttpCode.CREATED)
    .json({
        status: 'success', 
        code: HttpCode.CREATED, 
        data: {...user},
    })
}

const login = async (req, res) => {
    const token = await authService.login(req.body)
    return res
    .status(HttpCode.OK)
    .json({
        status: 'success', 
        code: HttpCode.OK, 
        data: {token},
    })
}

const logout = async (req, res) => {
    await authService.logout(req.user.id)
    return res
    .status(HttpCode.NO_CONTENT)
    .json({
        status: 'No content',
        code: HttpCode.NO_CONTENT,
    })
}

const current = async (req, res) => {
    await authService.current(req.user.id)
    return res
        .status(HttpCode.OK)
        .json({
            email: req.user.email,
            subscription: req.user.role,
            avatar: req.user.avatar,
        })
}

module.exports = {registration, login, logout, current}