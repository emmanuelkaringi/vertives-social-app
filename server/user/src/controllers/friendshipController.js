const { response } = require("express");
const config = require("../config/vertivesConfig");
const mssql = require("mssql");

async function getFollowingStatus(req, res) {
  try {
    const followerId = req.user.user_id; // Assuming you have the logged-in user's ID in req.user.user_id
    const followingId = req.params.userId;

    // Call the getFollowingStatus stored procedure
    const isFollowing = await getFollowingStatus(followerId, followingId);

    res.json({ isFollowing });
    console.log(response)
  } catch (error) {
    console.error("Error occurred while getting following status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getFollowers(req, res) {
  try {
    const userId = req.params.userId;
    const pool = await mssql.connect(config);

    if (pool.connected) {
      const request = pool.request()
        .input("user_id", mssql.UniqueIdentifier, userId);

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
      const request = pool.request()
        .input("user_id", mssql.UniqueIdentifier, userId);

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
      const request = pool
        .request()
        .input("followerId", mssql.UniqueIdentifier, followerId)
        .input("followingId", mssql.UniqueIdentifier, followingId);

      const result = await request.execute("social.FollowUser");
      const message = result.output.message;

      // Check if the user is already following the target user
      if (message === "You are already following this user") {
        res.status(400).json({ error: message });
      } else {
        res.status(200).json({ message: "User followed successfully" });
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
      const request = await pool
        .request()
        .input("followerId", mssql.UniqueIdentifier, followerId)
        .input("followingId", mssql.UniqueIdentifier, followingId)
        .execute("social.UnfollowUser");

      res.status(200).json({ message: "User unfollowed successfully" });
    }
  } catch (error) {
    console.error("Error occurred while unfollowing user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getFollowingStatus, getFollowers, getFollowing, followUser, unFollowUser };
