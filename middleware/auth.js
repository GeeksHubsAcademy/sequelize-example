const jwt = require('jsonwebtoken');
const {
    User
} = require('../models/');

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, 'mimamamemimamucho');
        const user = await User.findByPk(payload.id);
        if (!user) {
            return res.status(401).send({
                message: 'You are not authorized'
            })
        }
        req.user = user;
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({
            message: 'You are not authorized',
            error
        })
    }
}
module.exports = auth;