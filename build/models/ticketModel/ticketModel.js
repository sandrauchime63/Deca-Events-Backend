"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Ticket extends sequelize_1.Model {
}
exports.Ticket = Ticket;
Ticket.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    owner_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    owner_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    event_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    order_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    event_name: {
        type: sequelize_1.DataTypes.STRING
    },
    event_type: {
        type: sequelize_1.DataTypes.STRING
    },
    ticket_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER
    },
    total_cost: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: index_1.database,
    tableName: 'Ticket'
});
exports.default = Ticket;
