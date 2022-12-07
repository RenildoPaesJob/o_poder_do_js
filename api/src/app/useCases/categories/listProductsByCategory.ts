import { Request, Response } from 'express'
import { Product } from '../../models/Product'

export async function listProductsByCategory(req: Request, res: Response) {
	try {
		// esse dado vem atravez da URL, e o nome do parametro que foi passado
		// na URL e que pega dentro das {} ex:
		// router.get('/categories/:categoryId/products', listProductsByCategory)
		// o nome que esta após os : e o parametro a ser desestruturado
		const { categoryId } = req.params
		const products = await Product.find().where('category').equals(categoryId)
		res.json(products)

	} catch (error) {

		console.log('error: ', error)
		res.sendStatus(500)
	}
}