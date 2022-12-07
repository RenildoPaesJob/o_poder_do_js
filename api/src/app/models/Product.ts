import { model, Schema } from 'mongoose'

export const Product = model('Product', new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imagePath: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: Number
	},
	ingredients: {
		required: true,
		type: [{
			name: {
				type: String,
				required: true
			},
			icon: {
				type: String,
				required: true
			},
		}]
	},
	// relacionamento com o tabela category
	category: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Category'
	}
}))