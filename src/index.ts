import path from "node:path"
import express from "express"
import mongoose from "mongoose"

import { router } from "./router"

mongoose.set("strictQuery", true)

mongoose.connect("mongodb://localhost:27017")
	.then(() => {
		console.log("Conectado ao MongoDB")
		const app = express()

		app.use((req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", "*")
			res.setHeader("Access-Control-Allow-Methods", "*")
			res.setHeader("Access-Control-Allow-Headers", "*")

			next()
		})
		app.use("/uploads", express.static(path.resolve(__dirname, "..","uploads")))
		app.use(express.json())
		app.use(router)

		const port = 3001
		app.listen(port, () => {
			console.log(`🚀 Server is running on http://localhost:${port} 🔥`)
		})
	})
	.catch(() => console.log("Error ao conectar ao mongoDB"))

