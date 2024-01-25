"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
// models/Order.ts
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    tickets: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    owner_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    order_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    event_owner_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    event_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    owner_email: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: index_1.database,
    tableName: 'Order',
});
exports.default = Order;
