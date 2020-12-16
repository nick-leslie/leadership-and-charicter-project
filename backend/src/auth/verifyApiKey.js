const jwt = require('jsonwebtoken');

module.exports.verifyFunc = (token) => {
    try {
        let decoded = jwt.verify(token,process.env.TOKEN_SECRET); 
        return decoded
    } catch(e) {
        console.log(e);
        return false
    }
  }