import { Request, Response } from 'express'
import { Order } from '../../models/Order'

export async function listOrders(req: Request, res: Response) {
	try {
		// aqui ele vai procuras as orders(pedidos), fazendo o inner join com a tabela de products
		// e ordernando pelo createdAt de forma ASC = 1 ou DESC -1
		const orders = await Order.find()
			.sort({ createdAt: 1})
			.populate('products.product')

		res.json(orders)

	} catch (error) {

		console.log('error: ', error)
		res.sendStatus(500)
	}
}