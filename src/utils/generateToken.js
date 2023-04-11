const jwt = require('jsonwebtoken');


const generateToken = userId => {

  const JWT_SECRET_KEY ='keyhghgdhsds';

  return jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),id: userId }, JWT_SECRET_KEY, function(err, token) {
    // debugger;
    console.log(token);
  });
};

module.exports = generateToken;

//can you debug login? yes vo atha hay apnay route pay data adding kay time pir error datha ha
