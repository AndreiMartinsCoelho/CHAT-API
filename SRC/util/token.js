const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key) => jwt.verify(token, key, (err, decoded) => {
    if (decoded.id === id) {
      return true; // validar token 
    } else {
      return false;
  }
      
});

const setToken = async (id, key) => {
    console.log(id);
    if(id){
        return jwt.sign({id }, key, {expiresIn:28800});
    }

    return false;
};

module.exports = {
    checktoken,
    setToken,
};
