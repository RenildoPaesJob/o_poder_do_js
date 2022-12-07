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
import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'

import { listCategories } from './app/useCases/categories/listCategories'
import { createCategory } from './app/useCases/categories/createCategory'
import { listProdutcts } from './app/useCases/products/listProducts'
import { createProducts } from './app/useCases/products/createProducts'
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory'
import { listOrders } from './app/useCases/orders/listOrders'
import { createOrder } from './app/useCases/orders/createOrder'
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus'
import { cancelOrder } from './app/useCases/orders/cancelOrder'

export const router = Router()

// function para fazer o upload das imagens do produtos => MULTER
const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			// diretorio pra uploads
			callback(null, path.resolve(__dirname , '..', 'uploads'))
		},
		filename(req, file, callback){
			// criação do nome do arquivo
			callback(null, `${Date.now()}-${file.originalname}`)
		}
	})
})

// 1° route
router.get('/categories', listCategories)

// 2° route
router.post('/categories', createCategory)

// 3° route
router.get('/products', listProdutcts)

// 4° route
// single => para fazer o upload apenas de um unico arquivo
// o params => nome da propriedade do request onde ta o arquivo = JSON
router.post('/products', upload.single('image'), createProducts)

// 5° route
router.get('/categories/:categoryId/products', listProductsByCategory)

// 6° route
router.get('/order', listOrders)

// 7° route
router.post('/order', createOrder)

// 8° route
router.patch('/order/:orderId', changeOrderStatus)

// 9° route
router.delete('/order/:orderId', cancelOrder)