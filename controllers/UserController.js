const {
    User,
    Appointment,
    Sequelize
} = require('../models/index.js');
const {
    Op
} = Sequelize;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');
const UserController = {
    getAll(req, res) {
        User.findAll({
            include: [{
                model: Appointment
            }]
        }).then(users => res.send(users))
    },
    async signup(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 9);
            const user = await User.create(req.body);
            res.status(201).send(user)
        } catch (error) {
            console.error(chalk.red(error))
            res.status(400).send({
                message: 'There was a problem trying to register the user, check the fields',
                error
            })
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({ // SELECT * FROM users WHERE email = ${req.body.email};
                where: {
                    email: req.body.email
                }
            })
            if (!user) {
                return res.status(400).send({
                    message: 'Wrong credentials'
                });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if (!isMatch) {
                return res.status(400).send({
                    message: 'Wrong credentials'
                });
            }
            const token = jwt.sign({
                id: user.id
            }, 'mimamamemimamucho', {
                expiresIn: '2y'
            })
            res.send({
                user,
                token,
                message: 'Succesfully logged In'
            });
        } catch (error) {
            console.error(chalk.red(error))
            res.status(400).send({
                message: 'There was a problem trying to login the user, check the fields',
                error
            });
        }

    }
}

module.exports = UserController;