"use strict";
exports.__esModule = true;
exports.router = void 0;
/**
 * Possiveis caso de uso dentro da aplicação
 * São as segintes:
 *
 * 1 -> List categories
 * 2 -> Create category
 * 3 -> List Porduct
 * 4 -> Create products
 * 5 -> Get products by category
 * 6 -> List order
 * 7 -> Create order
 * 8 -> Changer order status
 * 9 -> Delete/Cancel order
 */
var express_1 = require("express");
var multer_1 = require("multer");
var node_path_1 = require("node:path");
var listCategories_1 = require("./app/useCases/categories/listCategories");
var createCategory_1 = require("./app/useCases/categories/createCategory");
var listProducts_1 = require("./app/useCases/products/listProducts");
var createProducts_1 = require("./app/useCases/products/createProducts");
var listProductsByCategory_1 = require("./app/useCases/categories/listProductsByCategory");
var listOrders_1 = require("./app/useCases/orders/listOrders");
var createOrder_1 = require("./app/useCases/orders/createOrder");
var changeOrderStatus_1 = require("./app/useCases/orders/changeOrderStatus");
var cancelOrder_1 = require("./app/useCases/orders/cancelOrder");
exports.router = (0, express_1.Router)();
// function para fazer o upload das imagens do produtos => MULTER
var upload = (0, multer_1["default"])({
    storage: multer_1["default"].diskStorage({
        destination: function (req, file, callback) {
            // diretorio pra uploads
            callback(null, node_path_1["default"].resolve(__dirname, '..', 'uploads'));
        },
        filename: function (req, file, callback) {
            // criação do nome do arquivo
            callback(null, "".concat(Date.now(), "-").concat(file.originalname));
        }
    })
});
// 1° route
exports.router.get('/categories', listCategories_1.listCategories);
// 2° route
exports.router.post('/categories', createCategory_1.createCategory);
// 3° route
exports.router.get('/products', listProducts_1.listProdutcts);
// 4° route
// single => para fazer o upload apenas de um unico arquivo
// o params => nome da propriedade do request onde ta o arquivo = JSON
exports.router.post('/products', upload.single('image'), createProducts_1.createProducts);
// 5° route
exports.router.get('/categories/:categoryId/products', listProductsByCategory_1.listProductsByCategory);
// 6° route
exports.router.get('/order', listOrders_1.listOrders);
// 7° route
exports.router.post('/order', createOrder_1.createOrder);
// 8° route
exports.router.patch('/order/:orderId', changeOrderStatus_1.changeOrderStatus);
// 9° route
exports.router["delete"]('/order/:orderId', cancelOrder_1.cancelOrder);
