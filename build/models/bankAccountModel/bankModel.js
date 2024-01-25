"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Bank extends sequelize_1.Model {
}
exports.Bank = Bank;
Bank.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    owner_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    bank_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    owner_name: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: index_1.database,
    tableName: 'Bank'
});
exports.default = Bank;
