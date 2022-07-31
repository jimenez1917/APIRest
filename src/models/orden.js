const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrdenSchema = new Schema({
    Items: {
        type: Array,
        required: true,
    },
    NumeroOrden :{
		type: Number,
		required:true,
	},
    timestamp: {
        type: Date,
        required: true,
    },
	Estado:{
		type:String,
		required:true,
	},
    Email:{
        type:String,
        required:true,
    }
});

const Orden = mongoose.model('Ordenes',OrdenSchema);

module.exports = Orden;
