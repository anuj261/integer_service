var jwt = require('jsonwebtoken');

var authentication= function(req, res, next) {
  var token = req.headers['authorization'];
  
  token=token && token.split(" ")
  
  if (!token && token.length!=2 && token[0] !="Bearer"  && token[1])
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token[1], config.secret, function(err, decoded) {
    if (err)
    return res.status(401).send({ auth: false, message: 'Invalid token.' });
      
    // if everything good, save to request for use in other routes
    
    req.user_Id = decoded.user_id;
    next();
  });
}

module.exports.authentication = authentication;