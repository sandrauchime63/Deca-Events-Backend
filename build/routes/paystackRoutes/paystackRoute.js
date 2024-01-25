"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paystack_1 = require("../../controllers/paystack/paystack");
const authorization_1 = require("../../middleware/authorization");
const router = express_1.default.Router();
router.post("/pay", authorization_1.generalAuthoriser, paystack_1.payStack);
exports.default = router;
