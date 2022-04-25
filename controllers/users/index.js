const {HttpCode} = require('../../libs/constants')
const AvatarService = require('../../services/avatar')
const LocalStorage = require('../../services/avatar/local-storage')

const avatar = async (req, res, next) => {
    const avatarService = new AvatarService(LocalStorage, req.file, req.user)
    const urlOfAvatar = await avatarService.update()
    res
    .json({
        status: 'success',
        code: HttpCode.OK,
        payload: {avatar: urlOfAvatar},
        message: 'Avatar updated!'
    })
}

module.exports = {avatar}