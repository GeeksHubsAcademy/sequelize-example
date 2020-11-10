'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Appointment extends Model {
        static associate(models) {
            this.belongsTo(models.User)
            this.belongsTo(models.User, {
                as: 'Doctor',
                foreignKey: 'DoctorId'
            })
        }
    };
    Appointment.init({
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: null
        },
        DoctorId: {
            type: DataTypes.INTEGER,
            allowNull: null
        },
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Appointment',
    });
    return Appointment;
};