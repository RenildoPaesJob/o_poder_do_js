"use strict";
exports.__esModule = true;
var express_1 = require("express");
var node_path_1 = require("node:path");
// conexão mongoDB
var mongoose_1 = require("mongoose");
var router_1 = require("./router");
var portDB = 27017;
// conexão mongoDB
mongoose_1["default"].connect("mongodb://localhost:".concat(portDB))
    .then(function () {
    console.log('Conectado ao mongoDB');
    var app = (0, express_1["default"])();
    var portServer = 3001;
    // o express entede qual são os arquivos statics, e quando e feito uma
    // requisição para o caminho abaixo, o servidor/express disponibiliza o arquivo
    app.use('/uploads', express_1["default"].static(node_path_1["default"].resolve(__dirname, '..', 'uploads')));
    app.use(express_1["default"].json());
    app.use(router_1.router);
    app.listen(portServer, function () {
        console.log("\uD83D\uDC7D\uD83D\uDE80 Server is running on http://localhost:".concat(portServer, "!"));
    });
})["catch"](function () { console.log('Erro ao conectado ao mongoDB'); });
