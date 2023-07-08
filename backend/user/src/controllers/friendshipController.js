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
    const followerId = req.body.followerId;
    const followingId = req.body.followingId;
    const pool = await mssql.connect(config);

    if (pool.connected) {
      const request = await pool.request()
      .input("follower_id", mssql.UniqueIdentifier, followerId)
      .input("following_id", mssql.UniqueIdentifier, followingId);
      
      const result = await request.execute("social.FollowUser");
      const message = result.recordset[0].message;

      // Check if the user is already following the target user
      if (message === 'You are already following this user') {
        res.status(400).json({ error: message });
      } else {
        res.status(200).json({ message: 'User followed successfully' });
      }
    }
  } catch (error) {
    console.error("Error occurred while following user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function unFollowUser(req, res) {
  try {
    const followerId = req.body.followerId;
    const followingId = req.body.followingId;
    const pool = await mssql.connect(config);

    if (pool.connected) {
      const request = await pool.request()
      .input("follower_id", mssql.UniqueIdentifier, followerId)
      .input("following_id", mssql.UniqueIdentifier, followingId)
      .execute("social.UnfollowUser");

      res.status(200).json({ message: 'User unfollowed successfully' });
    }
  } catch (error) {
    console.error("Error occurred while unfollowing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getFollowers, getFollowing, followUser, unFollowUser };
