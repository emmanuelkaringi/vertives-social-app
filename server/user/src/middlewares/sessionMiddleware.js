const { createClient } = require('redis');
const RedisStore = require("connect-redis").default;

async function sessionAuth(req, res, next) {
  try {
    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to Redis");
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: '',
      maxAge: 30 * 60 * 1000 // 30 minutes in milliseconds
    });

    let cookie = req.headers['cookie'];
    console.log(cookie);
    let sessionID = cookie.substring(16, 52);
    let session = await redisClient.get(sessionID);
    console.log(session);
    
    if (session == null) {
      res.status(401).send("You are not logged in");
    } else {
      let json_session = JSON.parse(session);
      console.log(json_session.authorized);

      const authorized = json_session?.authorized;
  
      if (authorized) {
        // Session is valid and authorized
        console.log(json_session);
        req.session = {
          ...json_session,
          userId: json_session.authorized.user_id
        };
        next(); // Proceed to the next middleware or route handler
      } else {
        // Session is invalid or unauthorized
        res.status(401).send("You are not logged in");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = { sessionAuth };