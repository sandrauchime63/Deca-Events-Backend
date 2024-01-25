"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Comment extends sequelize_1.Model {
}
exports.Comment = Comment;
Comment.init({
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
    comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER
    },
    likesArr: {
        type: sequelize_1.DataTypes.JSON
    },
    dislikes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    dislikesArr: {
        type: sequelize_1.DataTypes.JSON
    },
    comment_time: {
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
    tableName: 'Comment'
});
exports.default = Comment;
