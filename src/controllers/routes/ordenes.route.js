const express= require('express');
const router=express.Router();
const {ordenDao,carritoDao}=require('../../models/daos');
const {passportCall} = require('../middlewares/session.middlewares');
const transporter = require('../../models/config/Ndmail.config.js');

router.get('/', passportCall('jwt'),async (req,res)=>{
    try{
        if(req.user!=undefined){
            let ordenes= await ordenDao.getAll();
            let ordenUsuario = ordenes.filter(orden=>{
                if(orden.Email===req.user.username){
                    return orden
                }
            })
            res.render('OrdenDeCompra.ejs',{Ordenes:ordenUsuario})
        }else{res.redirect('/login')} 
    }catch(err){console.log(err)}
})
router.post('/', passportCall('jwt'),async (req,res)=>{
    try{
        if(req.user!=undefined){
            let carrito= await carritoDao.getById(req.user.id);
            let Items = carrito[0].Items;
            let Ordenes= await ordenDao.getAll();
            let NumeroOrden= Ordenes.length+1; // generar numero de orden
            let NuevaOrden= {
                Items,
                NumeroOrden,
                timestamp: new Date(),
                Estado: "generada",
                Email: req.user.username,
            };
            await ordenDao.save(NuevaOrden);
            //envio de correo con la orden
            const mailOptions={
                from: 'Servidor',
                to: 'chad.reynolds79@ethereal.email',
                subject: 'Orden De Compra',
                html: `<h5>NumeroOrden</h5>
                <p>${NuevaOrden.NumeroOrden}</p>
                <h5>Registro de Orden</h5>
                <p>${NuevaOrden.timestamp}</p>
                <h5>Estado</h5>
                <p>${NuevaOrden.Estado}</p>
                <h5>Usuario que genero la orden</h5>
                <p>${NuevaOrden.Email}</p>
                <h5>Cantidad de Items</h5>
                <p>${NuevaOrden.Items.length}</p>`
            }
            try{
                await transporter.sendMail(mailOptions)
                res.redirect('/OrdenDeCompra')
            }catch(e){
                console.log(e);
            }
        }else{
            res.redirect('/login');
        }
    }catch(err){console.log(err)}
    })

module.exports=router;