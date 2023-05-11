const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key) => jwt.verify(token, key, (err, decoded) => {
    . . . . 
});

const setToken = async (id, key) => {
    console.log(id);
    if(id){
        return jwt.sign({id }, key, {expiresIn:2800});
    }

    return false;
};

module.exports = {
    checktoken,
    setToken,
};
