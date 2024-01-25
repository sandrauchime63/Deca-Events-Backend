"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Report extends sequelize_1.Model {
}
exports.Report = Report;
Report.init({
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
    report: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    report_time: {
        type: sequelize_1.DataTypes.DATE
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: index_1.database,
    tableName: 'Report'
});
exports.default = Report;
