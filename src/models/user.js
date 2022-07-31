const mongoose=require('mongoose');

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    nombre: {type:String, required:true},
    direccion: {type:String, required:true},
    edad: {type:Number, required:true}, 
    telefono: {type:Number, required:true},
    profile_picture: {type:String, required:false},
    role: {type:String, required:true},
})

const User = mongoose.model(usersCollection,userSchema);
module.exports = User;