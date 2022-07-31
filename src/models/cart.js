const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
	Email :{
		type: String,
		required:true,
	},
	Direccion:{
		type:String,
		required:true,
	},
	timestamp: {
		type: Date,
		required: true,
	},
	Items: {
		type: Array,
		required: true,
	},
});

const Cart = mongoose.model('Carts',CartSchema);

module.exports = Cart;
