const MongoContainer = require('../../contenedor/mongoContainer');
const Carrito = require('../../cart');

class MongoCarrito {
    CarritoManager = new MongoContainer(Carrito);

    delete = async (id)=>{
        return await this.CarritoManager.delete(id);
    }
    getById = async (id) => {
        return await this.CarritoManager.getById(id);
    }
    save= async(carrito) => {
        return await this.CarritoManager.save(carrito);
    }
    update=async(id,option)=>{
        return await this.CarritoManager.update(id,option);
    }
}
module.exports = MongoCarrito;