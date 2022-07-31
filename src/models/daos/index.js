const MongoProductDao = require('./products/mongoProductDao.js');
const MongoUser = require('./users/mongouser');
const MongoCarrito = require('./carritos/mongoCarrito');
const MongoChat = require('./messages/mongoChat');
const MongoOrden = require('./ordenes/mongoOrden');

const dbToUse = process.env.PERSISTENCE;

let productDao ;
let userDao;
let carritoDao ;
let chatDao ;
let ordenDao;

switch (dbToUse) {
    case 'mongo':
        productDao = new MongoProductDao();
        userDao= new MongoUser();
        carritoDao= new MongoCarrito();
        chatDao= new MongoChat();
        ordenDao = new MongoOrden();
        break;
    default:
        break;
}

module.exports = {productDao,userDao,carritoDao,chatDao,ordenDao};
