async function getUserWithFollowersAndFollowing(username, email, pool) {
  if (pool.connected) {
    let userCheck = await pool
      .request()
      .input("username", username)
      .input("email", email)
      .query(
        "SELECT * FROM social.user_profile WHERE username = @username OR email = @email"
      );

    if (userCheck.recordset.length === 0) {
      // User not found
      throw new Error("User not found");
    }

    let user = userCheck.recordset[0]

    return user;
  }
}

module.exports = getUserWithFollowersAndFollowing;
