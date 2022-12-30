"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notfound = (_req, res, _next) => {
    res.status(404).json({
        status: 'not found',
        message: 'Resource not found'
    });
};
exports.default = notfound;
