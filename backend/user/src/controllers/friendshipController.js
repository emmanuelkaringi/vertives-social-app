const config = require("../config/vertivesConfig");
const mssql = require("mssql");

async function getFollowers(req, res) {
  try {
    const userId = req.params.userId;
    const pool = await mssql.connect(config);

    if (pool.connected) {
      const request = pool.request();
      request.input("user_id", mssql.UniqueIdentifier, userId);
      const result = await request.execute("social.GetFollowers");
      console.log(result);

      // Process the result and send the response
      const followers = result.recordset;
      res.json(followers);
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error occurred while getting followers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFollowing(req, res) {
  try {
    const userId = req.params.userId;
    const pool = await mssql.connect(config);

    if (pool.connected) {
      const request = pool.request();
      request.input("user_id", mssql.UniqueIdentifier, userId);
      const result = await request.execute("social.GetFollowing");
      console.log(result);

      const followers = result.recordset;
      res.json(followers);
    }
  } catch (error) {
    console.error("Error occurred while getting following:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function followUser(req, res) {
  try {
  } catch (error) {}
}

async function unFollowUser(req, res) {
  try {
  } catch (error) {}
}

module.exports = { getFollowers, getFollowing, followUser, unFollowUser };
