const MongoContainer = require('../../contenedor/mongoContainer');
const Orden = require('../../orden');

class MongoCarrito {
    OrdenesManager = new MongoContainer(Orden);

    getAll = async () => {
        return await this.OrdenesManager.getAll();
    }
    save= async(carrito) => {
        return await this.OrdenesManager.save(carrito);
    }
}
module.exports = MongoCarrito;