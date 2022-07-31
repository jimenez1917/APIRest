const passport=require('passport');
const PassportLocal= require('passport-local').Strategy;
const PassportJWT= require('passport-jwt').Strategy;
const ExtractJwt= require('passport-jwt').ExtractJwt;
const User= require('../user');
const {userDao} = require('../daos')
const {createHash,isValidPassword,cookieExtractor} = require('../middlewares/utils');

const initializePassport=()=>{
    passport.use('signup', new PassportLocal({passReqToCallback:true},async (req,username, password,done)=>{
        let {nombre,direccion,edad,telefono,codigoAdmin} = req.body;
        try{
            let role;
            if(!req.file) return done(null,false,{message:'couldnot upload avatar'});
            if(codigoAdmin==='2468'){
                role = 'admin';
            }else{ role = 'user'}
            let user = await userDao.getBy({username:username})
            if(user) {return done(null,false,{message:'Useralready Exist'})}
            const newUser = {
                username: username,
                password: createHash(password),
                nombre: nombre,
                direccion: direccion,
                edad: edad,
                telefono: telefono,
                profile_picture:req.file.filename,
                role:role,
            }
            let result = await userDao.save(newUser);
            return done(null,result)
        }catch(err){
            console.log(err);
            return done(err);
        }
    }))
    passport.use('loginStrategy',new PassportLocal(async function(username,password,done){
        try{
            const user = await userDao.getBy({username:username})
            if(!user) return done(null,false,{messages:"No user found"})
            if(!isValidPassword(user,password)) return done(null,false,{messages:"Incorrect password"})
            return done(null,user);
        }catch(err){
            console.log(err)
            return done(err);
        }
    }))
    passport.use('jwt',new PassportJWT({jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),secretOrKey:'cualquiercosa'},async(jwt_payload,done)=>{
        try{
            let user = await userDao.getBy({_id:jwt_payload._id})
            if(!user) return done(null,false,{messages:"User not found"});
            return done(null,user);
        }catch(err){
            return done(err);
        }
    }))

//serializacion

passport.serializeUser(function(user,done){
    done(null,user._id);
})

passport.deserializeUser(async(id,done)=>{
    let result = await userDao.getBy({_id:id})
    done(null,result)
})
}

module.exports = initializePassport;