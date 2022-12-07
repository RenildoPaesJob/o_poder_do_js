import { Request, Response } from 'express'
import { Category } from '../../models/Category'
import { Product } from '../../models/Product'

export async function createProducts (req: Request, res: Response){

	try {
		const imagePath = req.file?.filename
		const { name, description, price, category, ingredients } = req.body
		const product = await Product.create({
			name,
			description,
			imagePath,
			price: Number(price),
			category,
			ingredients: ingredients ? JSON.parse(ingredients) : []
		})

		res.status(201).json(product)

	} catch (error) {
		console.log('error: ', error)
		res.sendStatus(500)
	}
}