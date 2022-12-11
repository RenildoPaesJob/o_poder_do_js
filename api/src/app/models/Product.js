"use strict";
exports.__esModule = true;
exports.Product = void 0;
var mongoose_1 = require("mongoose");
exports.Product = (0, mongoose_1.model)('Product', new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: Number
    },
    ingredients: {
        required: true,
        type: [{
                name: {
                    type: String,
                    required: true
                },
                icon: {
                    type: String,
                    required: true
                }
            }]
    },
    // relacionamento com o tabela category
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
}));
