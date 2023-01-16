import { Request, Response } from "express"
import { Order } from "../../models/Order"

export async function createOrder(req: Request, res: Response) {
	try {
		const { icon, name } = req.body

		const order = await Order.create({ icon, name })

		res.status(201).json(order)

	} catch (error) {
		console.error(error)
		res.sendStatus(500)
	}
}