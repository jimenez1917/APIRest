
const MongoContainer = require('../../contenedor/mongoContainer');
const User = require('../../user');

class UserDao {
    userManager = new MongoContainer(User);

    getBy = async (user) => {
        return await this.userManager.getBy(user);
    }
    save = async (user) => {
        return await this.userManager.save(user);
    }
}
module.exports = UserDao;