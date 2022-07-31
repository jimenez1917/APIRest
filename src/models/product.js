const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
	descripcion: {
		type: String,
		required: true,
	},
	categoria: {
		type: String,
		required: true,
	},
	foto_url: {
		type: String,
		required: false,
	},
	precio: {
		type: Number,
		required: true,
	},
});

const Product = mongoose.model('Product', ProductsSchema);

module.exports = Product;
