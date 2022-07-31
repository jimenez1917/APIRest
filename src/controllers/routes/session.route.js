const express= require('express');
const router=express.Router();
const {passportCall,sendingEmail,uploader} = require('../middlewares/session.middlewares');
const jwt = require('jsonwebtoken')

router.get('/',passportCall('jwt'),(req, res) => {
    try{
        res.render('partials/head.ejs')
    }catch(err){console.log(err)}
})
router.get('/signup',(req,res)=>{
    try{
        if(req.cookies.JWT_COOKIE) return res.redirect('/');
        res.render('register.ejs')
    }catch(err){console.log(err)}
})
router.post('/signup', uploader.single('avatar'),passportCall('signup'),sendingEmail,(req, res)=>{
    try{
        let user = req.user;
        let token = jwt.sign(JSON.stringify(user),'cualquiercosa');
        res.cookie("JWT_COOKIE",token,{
            httpOnly:true,
            maxAge:process.env.SESSIONMAXAGE
        })
        res.redirect('/');
    }catch(err){console.log(err)}
})
router.get('/login', (req, res) => {
    try{
        if(req.cookies.JWT_COOKIE) return res.redirect('/');
        res.render('login.ejs');
    }catch(err){console.log(err)}
});
router.post('/login',passportCall('loginStrategy'),(req, res)=>{
    try{
        let user = req.user;
        let token = jwt.sign(user.toJSON(),'cualquiercosa');
        res.cookie("JWT_COOKIE",token,{
            httpOnly:true,
            maxAge:process.env.SESSIONMAXAGE
        })
        res.redirect('/');
    }catch(err){console.log(err)}
    });
router.post('/logout',(req,res)=>{
    try{
        res.clearCookie('JWT_COOKIE')
        res.redirect('/');
    }catch(err){console.log(err)}
})
router.get('/perfil',passportCall('jwt'),async (req, res) => {
    try{
        if(req.user!=undefined){
            let perfil={
                username: req.user.username,
                nombre:req.user.nombre,
                direccion:req.user.direccion,
                edad:req.user.edad,
                telefono:req.user.telefono,
                role:req.user.role,
            }
            res.render('perfil.ejs',{perfil})
        }
    }catch(err){console.log(err)}
});

module.exports = router;