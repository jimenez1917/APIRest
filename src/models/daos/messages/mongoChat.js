const MongoContainer = require('../../contenedor/mongoContainer');
const Chat = require('../../message');

class MongoChat {
    ChatManager = new MongoContainer(Chat);

    getAll = async () => {
        return await this.ChatManager.getAll();
    }
    getById = async (id) => {
        return await this.ChatManager.getById(id);
    }
    save= async(carrito) => {
        return await this.ChatManager.save(carrito);
    }
    update=async(id,option)=>{
        return await this.ChatManager.update(id,option);
    }
}
module.exports = MongoChat;