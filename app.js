const express = require('express');
const passport= require('passport'); // Inicio de authentication
const cookieParser= require('cookie-parser'); //para parsear cualquier cookie
const initializePassport=require('./src/models/config/Passport.config') //configuración de estrategias
const Session = require('./src/controllers/routes/session.route.js'); // configuracion de rutas de session
const Productos = require('./src/controllers/routes/productos.route.js'); // configuracion de rutas de productos/profile
const Carrito = require('./src/controllers/routes/carrito.route.js'); // configuracion de rutas de productos/profile
const Chat = require('./src/controllers/routes/chat.route.js'); // configuracion de rutas de productos/profile
const OrdenDeCompra = require('./src/controllers/routes/ordenes.route.js'); // configuracion de rutas de productos/profile
const dotenv = require('dotenv');
const {Server} = require ('socket.io');
const {engine} = require('express-handlebars');
const path = require('path')
const cons = require('consolidate');
const {chatDao}=require('./src/models/daos');

dotenv.config({
    path:".env.dev"
})


const app = express(); 
app.use('/static',express.static(path.join(__dirname, '/src/static')));

app.use(express.urlencoded({extended: true})); //middleware
app.use(express.json()); //middleware
app.use(cookieParser()); //middleware
//Iniciando Contexto de Usuarios
initializePassport();
//
app.use(passport.initialize());
app.set('views', __dirname+'/src/views');
app.set('view engine', 'ejs');
app.engine('handlebars', engine({ defaultLayout: 'index' })); 
app.set('view engine', 'handlebars');
app.engine('html', cons.mustache)
app.set('view engine', 'html');
app.use('/',Session);
app.use('/productos',Productos);
app.use('/carrito',Carrito);
app.use('/chat',Chat);
app.use('/ordenDeCompra',OrdenDeCompra);

app.get('/servidor',(req,res)=>{
    let procesos={
        directorio:process.cwd(),
        id:process.pid,
        version: process.version,
        titulo: process.title,
        sistema: process.platform,
        memoria: process.memoryUsage()   
    }
    res.render('servidor.ejs',{procesos:procesos});
})
process.on('uncaughtException', function(err){
    JSON.parse(err).then(result=>result.toString()).then(result=>res.render('error',{error:result}));
})
const PORT = process.env.PORT || 8080
const server=app.listen(PORT, ()=>console.log(`listening on ${PORT}`));
const io=new Server(server);
let log=[];
io.on('connection',async socket=>{

    let hola= await chatDao.getAll();
    console.log('Conectado')
    io.emit('log',hola);

    socket.on('message',async data=>{
        log.push(data);
        io.emit('log',data);
    })
    
})


