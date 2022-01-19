const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pickup_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        miles: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        equipment_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;