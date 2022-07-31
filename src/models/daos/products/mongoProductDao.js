const MongoContainer = require('../../contenedor/mongoContainer');
const Product = require('../../product');

class MongoProductDao {
    productManager = new MongoContainer(Product);

    getAll = async () => {
        return await this.productManager.getAll();
    }
    delete = async (id)=>{
        return await this.productManager.delete(id);
    }
    getById = async (id) => {
        return await this.productManager.getById(id);
    }
    UploadById = async (id,body) => {
        return await this.productManager.UploadById(id,body);
    }
}
module.exports = MongoProductDao;