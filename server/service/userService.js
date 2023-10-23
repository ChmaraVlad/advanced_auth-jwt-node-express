const UserDto = require('../dtos/userDtos')
const UserModel = require('../models/user-model')

const MailService = require('./mailService')
const TokenService = require('./tokenService')

const bcrypt = require('bcrypt')
const uuid = require('uuid')

exports.registration = async (email, password) => {   
    const candidate = await UserModel.findOne({email})
    if(candidate) {
        throw new Error(`Пользователь с почтовым адресом ${email} уже зарегистрирован`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    // сохдаем ссилку для активации имейла
    const activationLink = uuid.v4()

    // сохраняем юзера
    const user = await UserModel.create({email, password: hashPassword, activationLink})

    // отправляем ему письмо для активации почты
    await MailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user) // id, email, isActivated
    // создаем и сохраняем токены
    const tokens = TokenService.generateTokens({...userDto}) // передаем пейлоад туда
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
}

exports.getAllUsers = async () => {
    try {
        const users = await UserModel.find({})
        .select('_id email password')
        return users
        
    } catch (error) {
        console.log('UserService - getAllUsers - error:', error)
    }
}

exports.activate = async (activationLink) => {
  try {
    const user = await UserModel.findOne({ activationLink });
    if(!user) {
        throw new Error('Некоректная ссылка активации')
    }
    user.isActivated = true
    await user.save()
  } catch (error) {
    console.log("UserService - activate - error:", error);
  }
};
