import path from "node:path"
import http from "node:http"
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"

import { router } from "./router"

const app    = express()
//web socket connection
const server = http.createServer(app)
export const io     = new Server(server)

io.on("connect", () => {
	console.log("Conectou ao Socket")
})

mongoose.set("strictQuery", true)

mongoose.connect("mongodb://localhost:27017")
	.then(() => {
		console.log("Conectado ao MongoDB")
		const port   = 3001


		app.use((req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", "*")
			res.setHeader("Access-Control-Allow-Methods", "*")
			res.setHeader("Access-Control-Allow-Headers", "*")

			next()
		})
		app.use("/uploads", express.static(path.resolve(__dirname, "..","uploads")))
		app.use(express.json())
		app.use(router)

		//listen web socket connection
		server.listen(port, () => {
			console.log(`🚀 Server is running on http://localhost:${port} 🔥`)
		})
	})
	.catch(() => console.log("Error ao conectar ao mongoDB"))

