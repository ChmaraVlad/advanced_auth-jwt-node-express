const UserService = require("../service/userService")

exports.registration = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const userData = await UserService.registration(email, password)

        res.cookie('refreshToken', userData.refreshToken,
        {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        res.json({userData})
    } catch (error) {
        console.log('userController registration => error: ', error);
        next(error);
    }
}
exports.login = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log('userController login => error: ', error);
        next(error);
    }
}
exports.logout = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log('userController logout => error: ', error);
        next(error);
    }
}
exports.activate = async (req, res, next) => {
    try {
        const activationLink = req.params.link
        await UserService.activate(activationLink)

        return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
        console.log('userController activate => error: ', error);
        next(error);
    }
}
exports.refresh = async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log('userController refresh => error: ', error);
        next(error);
    }
}
exports.users = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers()
        res.json({users})
    } catch (error) {
        console.log('userController users => error: ', error);
        next(error);
    }
}