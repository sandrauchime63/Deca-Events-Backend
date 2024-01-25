"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Earning = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Earning extends sequelize_1.Model {
}
exports.Earning = Earning;
Earning.init({
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
    order_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    event_name: {
        type: sequelize_1.DataTypes.STRING
    },
    order_number: {
        type: sequelize_1.DataTypes.STRING
    },
    ticket_quantity: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ticket_cost: {
        type: sequelize_1.DataTypes.INTEGER
    },
    event_category: {
        type: sequelize_1.DataTypes.STRING
    },
    ticket_type: {
        type: sequelize_1.DataTypes.STRING
    },
    total_amount: {
        type: sequelize_1.DataTypes.INTEGER
    },
    amount_earned: {
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
    tableName: 'Earning'
});
exports.default = Earning;
