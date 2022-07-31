const express= require('express');
const router=express.Router();
const {chatDao}=require('../../models/daos');
const {passportCall} = require('../middlewares/session.middlewares');


router.get('/',passportCall('jwt'),async (req,res)=>{
    try{
        if(req.user!=undefined){
            res.render('chat.html');
        }else{
            res.redirect('/login')
        }
    }catch(err){console.log(err)}
})
router.post('/:id',passportCall('jwt'),async (req, res) =>{
    try{
        if(req.user!=undefined){
            let UserResponse = req.user.username;
            let Respuesta = req.body.respuesta;
            let Chat = await chatDao.getById(req.params.id);
            let Respuestas = Chat[0].Respuestas;
            let NuevaRespuesta = {
                UserResponse,
                Respuesta
            }
            Respuestas.push(NuevaRespuesta);
            console.log('Respuesta',Respuestas);
            await chatDao.update({_id:req.params.id},{Respuestas:Respuestas});
            res.redirect('/chat')
        }else{
            res.redirect('/login')        
        }
    }catch(err){console.log(err)}
})
router.post('/',passportCall('jwt'),async (req,res)=>{
    try{
        if(req.user!=undefined){
            let body = req.body;
            let message = body.mensaje;
            let newMessage = { 
                Message:message,
                Username:req.user.username,
                Respuestas:[],       
            }
            await chatDao.save(newMessage);
        }else{
            res.redirect('/login')
        }
    }catch(err){console.log(err)}
    })
router.get('/myChat',passportCall('jwt'),async(req,res)=>{
    try{
        if(req.user!=undefined){
            let CompleteChat = await chatDao.getAll();
            let MyChat = CompleteChat.filter(chat =>{
                if(chat.Username==req.user.username){
                    return chat;
                }
            });
            res.render('myChat.ejs',{chathistory:MyChat})
        }else{
            res.redirect('/login')
        }
    }catch(err){console.log(err)}
    })

module.exports = router;