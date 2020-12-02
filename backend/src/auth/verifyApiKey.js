const jwt = require('jsonwebtoken');

module.exports.verifyFunc = (token) => {
    try {
    let decoded = jwt.verify(token,process.env.TOKEN_SECRET); 
    return decoded
    } catch {
        return false
    }
  }