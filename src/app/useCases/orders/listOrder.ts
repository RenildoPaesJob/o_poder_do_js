import { Request, Response } from "express"
import { Order } from "../../models/Order"

export async function listOrders (req: Request, res: Response) {
	try {
		// sort => order by
		const orders = await Order.find()
			.sort({createAt: 1})
			.populate("products.product")

		res.json(orders)
	} catch (error) {
		console.error(error)
		res.sendStatus(500)
	}
}