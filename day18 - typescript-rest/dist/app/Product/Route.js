"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = __importDefault(require("./Controller"));
const controller = new Controller_1.default;
const router = (0, express_1.Router)();
router.route('/product')
    .get(controller.get)
    .post(controller.post);
router.route('/product/:id')
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete);
exports.default = router;
