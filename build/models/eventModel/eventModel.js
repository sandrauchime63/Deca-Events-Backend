"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.eventType = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
var eventType;
(function (eventType) {
    eventType["BUSINESS"] = "Business";
    eventType["CHARITY"] = "Charity";
    eventType["COMMUNITY"] = "Community";
    eventType["CONCERT"] = "Concert";
    eventType["CONFERENCE"] = "Conference";
    eventType["EXHIBITION"] = "Exhibition";
    eventType["EXECUTIVE_MEETING"] = "Corporate off-sites & executive meeting";
    eventType["FASHION_SHOW"] = "Fashion show and red carpet";
    eventType["FESTIVAL"] = "Festival";
    eventType["FUNDRAISING"] = "Fundraising";
    eventType["HYBRID"] = "Hybrid";
    eventType["NETWORKING"] = "Networking";
    eventType["PRIVATE_PARTY"] = "Private Party";
    eventType["PRODUCT_LAUNCH"] = "Product launch";
    eventType["SEMINAR"] = "Seminar";
    eventType["SPORTS_AND_COMPETITION"] = "Sports and competition";
    eventType["TEAM_BUILDING"] = "Team building";
    eventType["TRADE_SHOW"] = "Trade show";
    eventType["VIRTUAL"] = "Virtual";
    eventType["WEDDING"] = "Wedding";
    eventType["WORKSHOP"] = "Workshop";
    eventType["OTHER"] = "Other";
})(eventType || (exports.eventType = eventType = {}));
class Event extends sequelize_1.Model {
}
exports.Event = Event;
Event.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    event_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(eventType)),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    event_date: {
        type: sequelize_1.DataTypes.DATE
    },
    event_time: {
        type: sequelize_1.DataTypes.STRING
    },
    ticket_types: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    owner_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tickets_bought: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    likesArr: {
        type: sequelize_1.DataTypes.JSON
    },
    dislikesArr: {
        type: sequelize_1.DataTypes.JSON
    },
    isBlocked: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    registered_users: {
        type: sequelize_1.DataTypes.JSON,
    },
    dislikes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    no_of_attendees: {
        type: sequelize_1.DataTypes.INTEGER
    },
    organizers: {
        type: sequelize_1.DataTypes.JSON
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: index_1.database,
    tableName: 'Event'
});
exports.default = Event;
