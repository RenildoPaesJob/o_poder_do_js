import path from "node:path"

import { Router } from "express"
import multer from "multer"

import { createCategory } from "./app/useCases/categories/createCategory"
import { listCategories } from "./app/useCases/categories/listCategory"
import { createProducts } from "./app/useCases/products/createProduct"
import { listProducts } from "./app/useCases/products/listProduct"
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory"
import { listOrders } from "./app/useCases/orders/listOrder"
import { createOrder } from "./app/useCases/orders/createOrder"
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus"
import { cancelOrder } from "./app/useCases/orders/cancelOrder"
import { cancelCategory } from "./app/useCases/categories/cancelCategory"
import { cancelProdutc } from "./app/useCases/products/cancelProdutc"

export const router = Router()

// method para onde irar enviar os arquivos enviados
// dica: fica fora da pasta SRC para que n faca o builder e perca os arquivos
const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback){
			callback(null, path.resolve(__dirname, "..", "uploads"))
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`)
		}
	})
})

// List categories
router.get("/categories", listCategories)

// Create category
router.post("/categories", createCategory)

// Delete/Cancel Category
router.delete("/categories/:orderId", cancelCategory)

// List products
router.get("/products", listProducts)

// Create products
router.post("/products", upload.single("image"), createProducts)

// Delete/Cancel Category
router.delete("/products/:productId", cancelProdutc)

// Get products by category
router.get("/categories/:categoryId/products", listProductsByCategory)

// List orders
router.get("/orders", listOrders)

// Create order
router.post("/orders", createOrder)

// Change order status
// "put"   => ATUALIZA TODO O DADO
// "patch" => ATUALIZA PARTE DO DADO
router.patch("/orders/:orderId", changeOrderStatus)

// Delete/Cancel order
router.delete("/orders/:orderId", cancelOrder)