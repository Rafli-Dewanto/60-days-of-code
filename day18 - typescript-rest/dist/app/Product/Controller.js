"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Product {
    get(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield prisma.product.findMany();
                res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const payload = {
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    stock: body.stock
                };
                const product = yield prisma.product.create({
                    data: payload
                });
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield prisma.product.findUniqueOrThrow({
                    where: {
                        id
                    }
                });
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                const payload = {
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    stock: body.stock
                };
                const product = yield prisma.product.update({
                    where: {
                        id
                    },
                    data: payload
                });
                const data = {
                    status: 200,
                    message: "OK",
                    payload: product
                };
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield prisma.product.delete({
                    where: {
                        id
                    }
                });
                const data = {
                    status: 200,
                    message: "the following data has been deleted",
                    payload: product
                };
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = Product;
