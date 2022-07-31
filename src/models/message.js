const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
	Username :{
		type: String,
		required:true,
	},
	Message:{
		type:String,
		required:true,
	},
	Respuestas: {
		type: Array,
		required: false,
	},
});

const Chat = mongoose.model('Chat',MessageSchema);

module.exports = Chat;
