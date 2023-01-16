import path from "node:path"

import { Router } from "express"
import multer from "multer"

import { createCategory } from "./app/useCases/categories/createCategory"
import { listCategories } from "./app/useCases/categories/listCategory"
import { createProducts } from "./app/useCases/products/createProduct"
import { listProducts } from "./app/useCases/products/listProduct"

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

// List products
router.get("/products", listProducts)

// Create products
router.post("/products", upload.single("image"), createProducts)

// Get products by category
router.get("/categories/:categoryId/products", (req, res) => {
	res.send("ok")
})

// List orders
router.get("/orders", (req, res) => {
	res.send("ok")
})

// Create order
router.post("/orders", (req, res) => {
	res.send("ok")
})

// Change order status
// "put"   => ATUALIZA TODO O DADO
// "patch" => ATUALIZA PARTE DO DADO
router.patch("/orders/:orderId", (req, res) => {
	res.send("ok")
})

// Delete/Cancel order
router.delete("/orders/:orderId", (req, res) => {
	res.send("ok")
})