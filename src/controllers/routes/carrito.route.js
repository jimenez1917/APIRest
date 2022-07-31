const express= require('express');
const router=express.Router();
const {carritoDao,productDao}=require('../../models/daos');
const {passportCall} = require('../middlewares/session.middlewares');

router.post('/:id',passportCall('jwt'),async(req,res) => {
    try{
        if(req.user!=undefined){
            let carrito= await carritoDao.getById(req.user.id);
            if(carrito.length<1){
                const newCarrito={
                    _id:req.user.id,
                    Email:req.user.username,
                    Direccion:req.user.direccion,
                    timestamp: new Date(),
                    Items:[{cantidad:1,productoId:req.params.id}]
                }
                await carritoDao.save(newCarrito);
            }else{
                let items=[];
                let flag=true;
                for (let index = 0; index < carrito[0].Items.length; index++) {
                    if(carrito[0].Items[index].productoId==req.params.id){
                        items[index]={cantidad:carrito[0].Items[index].cantidad+1, productoId:req.params.id}
                        flag=false;
                    }else{
                        items[index]=carrito[0].Items[index];
                    }      
                }
                if(flag){
                    items=[...items,{cantidad:1, productoId:req.params.id}]
                    flag=true;
                }
                await carritoDao.update({_id:req.user.id},{Items:items});
            }
        }
    }catch(err){console.log(err)}
    })
router.get('/',passportCall('jwt'),async(req,res) => {
    try{        
        if(req.user!=undefined){
            let carrito= await carritoDao.getById(req.user.id);
            if(carrito.length>0){
                const productos = await carrito[0].Items.map(element => {
                    return element.productoId;
                });
            const cantidades = await carrito[0].Items.filter(element =>{
                return element;
            })
            let mostrar= await productDao.getById(productos).then(res=>{
                return(res)});
                for (let i = 0; i < mostrar.length; i++) {
                for (let j = 0; j < cantidades.length; j++) {
                    if(cantidades[j].productoId==mostrar[i].id) {
                        let cantidad=cantidades[j].cantidad
                        mostrar[i]={...mostrar[i]._doc,cantidad}
                    }                 
                }
            }
            res.render('carrito.ejs',{products:mostrar})
        }else{
            res.render('carrito.ejs',{products:[]})
        }
    }else{res.redirect('/login')}
}catch(err){console.log(err)}
})
router.put('/:id',passportCall('jwt'),async(req,res)=>{
    try{
        let value=parseInt(req.body.value)
        if(req.user!=undefined && value){
            let carrito = await carritoDao.getById(req.user.id);
            let items=[];
            for (let index = 0; index < carrito[0].Items.length; index++) {
                if(carrito[0].Items[index].productoId==req.params.id){
                items[index]={cantidad:value, productoId:req.params.id}
            }else{
                items[index]=carrito[0].Items[index];
            }  
        }
        await carritoDao.update({_id:req.user.id},{Items:items});
}

}catch(err){console.log(err)}
})
router.delete('/:id',passportCall('jwt'),async(req,res)=>{
    try{
        if(req.user!=undefined){
            let carrito = await carritoDao.getById(req.user.id);
            let items = carrito[0].Items.filter(item =>{
                if(item.productoId!=req.params.id){
                    return item;
                }
            })
            await carritoDao.update({_id:req.user.id},{Items:items});
        }
    }catch(err){console.log(err)}
})
router.post('/carrito/vaciar',passportCall('jwt'),async(req,res)=>{
    try{
        if(req.user!=undefined){
            await carritoDao.delete(req.user.id);
            res.redirect('/') 
        }
    }catch(err){console.log(err)}
})
module.exports = router;