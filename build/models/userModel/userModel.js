"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.role = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
var role;
(function (role) {
    role["ADMIN"] = "Admin";
    role["USER"] = "User";
})(role || (exports.role = role = {}));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    is_completed_profile: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
    },
    identity_document: {
        type: sequelize_1.DataTypes.STRING
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profile_picture: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    isBlocked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isAddAccount: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reports: {
        type: sequelize_1.DataTypes.JSON,
    },
    zip_code: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password is required",
            },
        },
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(role)),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: index_1.database,
    tableName: "User",
});
exports.default = User;
