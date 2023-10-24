const jwt = require('jsonwebtoken')

const TokenModel = require('../models/token-model')
const tokenModel = require('../models/token-model')
 
exports.generateTokens = (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        console.log('TokenService - generateToken - error: ',error);
    }
}
exports.saveToken = async (userId, refreshToken) => {
    try {
        const tokenData = await TokenModel.findOne({userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({userId, refreshToken})
        return token
    } catch (error) {
        console.log('TokenService - saveToken - error: ',error);
    }
}
exports.removeToken = async (refreshToken) => {
    try {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    } catch (error) {
        console.log("TokenService - removeToken - error: ", error);
    }
}
