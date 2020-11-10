const {
    Appointment,
    User,
    Sequelize
} = require('../models/index.js');
const {
    Op
} = Sequelize
const AppointmentController = {
    getAll(req, res) {
        Appointment.findAll({
                include: [User, {
                    model: User,
                    as: 'Doctor'
                }],
                where: {
                    date: {
                        [Op.lt]: Date.now()
                    }
                }
            }).then(appointments => res.send(appointments))
            .catch(error => {
                console.error(error);
                res.status(500).send(error)
            })
    },
    create(req, res) {

        req.body.UserId = req.user.id;
        Appointment.create(req.body)
            .then(appointment => res.status(201).send(appointment))
            .catch(error => {
                console.error(error);
                res.status(500).send(error)
            })
    }
}

module.exports = AppointmentController;