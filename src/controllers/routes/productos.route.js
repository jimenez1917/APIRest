const express= require('express');
const router=express.Router();
const {productDao}=require('../../models/daos');
const {passportCall,isAdmin} = require('../middlewares/session.middlewares');

router.get('/',passportCall('jwt'),async (req,res) =>{
    try{
        if(req.user!=undefined){
            await productDao.getAll().then(products => res.render('productos.ejs',{products:products}));
        }else{
            res.render('login')
        }
    }catch(e){console.log(e)}

});
router.post('/',passportCall('jwt'),isAdmin,async (req,res) =>{
    try{    
        let body =req.body;
        const product = await productDao.save(body);
        res.json({
            product,
            message: 'recuerda subir la imagen estatica en /src/controllers/product.images con el nombre del _id',
    })}catch(e){console.log(e)}
});
router.get('/admin',async (req,res)=>{
    try{
        res.render('admin.ejs')
    }catch(e){console.log(e)}
    
})
router.get('/:CategoriaOId',passportCall('jwt'),async (req,res) =>{
    try{
        if(req.user!=undefined){
            let productos = await productDao.getAll();
            let CategorySecure= productos.some(producto=>producto.categoria === req.params.CategoriaOId);
            let IdSecure= productos.some(producto=>producto.id === req.params.CategoriaOId);
            if(CategorySecure){
            let productCategory = productos.filter(element => {
                if(element.categoria === req.params.CategoriaOId){
                    return element;
                }
            })
            res.render('productos.ejs',{products:productCategory})
            }else if(IdSecure){
                let productId = productos.filter(element => {
                    if(element.id === req.params.CategoriaOId){
                        return element;
                    }
                })
                res.render('productos.ejs',{products:productId})
            }else{
                res.send({status:'error',message:'no existe dicha categoria'})
            }
        }else{
            res.render('login')
        }
    }catch(e){console.log(e)}
});
router.delete('/:id',passportCall('jwt'),isAdmin,async(req,res)=>{
    try{
        return await productDao.delete(req.params.id).then(res=>res.send({status:success}));
    }catch(e){console.log(e)}
    
})
router.put('/:id',passportCall('jwt'),isAdmin,async (req,res)=>{
    try{
        let bodi=req.body;
        const product = await productDao.UploadById(req.params.id,bodi);
        res.json({
            product,
            message: 'Updated product',
        });
    }catch(e){console.log(e)}
})
module.exports = router;