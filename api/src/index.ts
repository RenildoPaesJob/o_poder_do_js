import express from 'express'
import path from 'node:path'
// conexão mongoDB
import mongoose from 'mongoose'

import { router } from './router'

const portDB = 27017

// conexão mongoDB
mongoose.connect(`mongodb://localhost:${portDB}`)
	.then(() => {
		console.log('Conectado ao mongoDB')
		const app        = express()
		const portServer = 3001

		// o express entede qual são os arquivos statics, e quando e feito uma
		// requisição para o caminho abaixo, o servidor/express disponibiliza o arquivo
		app.use('/uploads', express.static(path.resolve(__dirname , '..', 'uploads')))
		app.use(express.json())
		app.use(router)

		app.listen(portServer, () => {
			console.log(`👽🚀 Server is running on http://localhost:${portServer}!`)
		})
	})
	.catch(() => {console.log('Erro ao conectado ao mongoDB')})