const { auth } = require('./firebaseConfig');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) return res.status(401).send({
      message: 'Token not found'
    });

  
    try {
      const decodedToken = await auth.verifyIdToken(token);
      
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).send({
        message: error
      });
    }
  };

module.exports = { authenticate };