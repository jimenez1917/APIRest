// MongoDb
const {mongoose} = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({
    path:".env.dev"
})
mongoose.connect(
	process.env.MONGO_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log(`connected to mongoDB`);
});

class MongoContainer {
	constructor(model) {
		this.model = model;
	}

	async getAll (){
		try{
			return await this.model.find();
		}catch(err){console.log(err)}
	}
	async delete(id) {
		try{
			return await this.model.deleteOne({_id:id});
		}catch(err){console.log(err)}
	}
	async getById(id){
		try{
			return await this.model.find({_id:id});
		}catch(err){console.log(err)}
	}
	async UploadById(id,body){
		try{
			return await this.model.update({_id:id},{nombre:body.nombre,descripcion:body.descripcion,codigo:body.codigo,foto_url:body.foto_url,precio:body.precio,stock:body.stock});
		}catch(err){console.log(err)}
	}
	async getBy(options){
		try{
			return this.model.findOne(options);
		}catch(err){console.log(err)}
    }
	async save (user){
		try{
			let result = await this.model.create(user)
			return result?result.toObject() : null
		}catch(err){console.log(err)}
	}
	async update(id,options){
		try{
			return await this.model.updateOne(id,options)
		}catch(err){console.log(err)}
	}
}


module.exports = MongoContainer;
