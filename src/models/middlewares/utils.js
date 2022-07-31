const bcrypt = require('bcrypt');

const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);
const cookieExtractor = req =>{
    let token = null;
    if(req&&req.cookies){
        token=req.cookies["JWT_COOKIE"];
    } 
    return token; 
}

module.exports = {createHash, isValidPassword, cookieExtractor};