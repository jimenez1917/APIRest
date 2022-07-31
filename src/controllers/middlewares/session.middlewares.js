const passport = require('passport');
const transporter = require('../../models/config/Ndmail.config.js');
const multer = require('multer');

const passportCall = (strategy)=>{
    return async (req, res, next)=>{
        passport.authenticate(strategy,function(err,user,info){
            if(err) return next(err);
            if(!user) return res.redirect('/login');
            req.user = user;
            next();
        })(req,res,next);
    }
}
const sendingEmail= async (req,res,next)=>{
    const mailOptions={
        from: 'Servidor',
        to: 'chad.reynolds79@ethereal.email',
        subject: 'nuevo registro',
        html: `<h5>Username</h5>
        <p>${req.user.username}</p>
        <h5>nombre</h5>
        <p>${req.user.nombre}</p>
        <h5>direccion</h5>
        <p>${req.user.direccion}</p>
        <h5>edad</h5>
        <p>${req.user.edad}</p>
        <h5>telefono</h5>
        <p>${req.user.telefono}</p>`
        }
    try{
        await transporter.sendMail(mailOptions)
        return next();
    }catch(e){
        console.log(e);
    }
}
const uploader = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'./src/controllers/profile.images')
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname);
        }
    })
})
const isAdmin = async (req, res, next) =>{
    if(req.user.role == 'admin'){
        next();
    }else{
        res.send({message: 'no autorizado a este endpoint'})
    }
}
module.exports={passportCall,sendingEmail,uploader,isAdmin}