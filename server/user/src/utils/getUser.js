// getUser utility function
const config = require("../config/vertivesConfig");
const mssql = require("mssql");

async function getUser(userId) {
  try {
    const pool = await mssql.connect(config);
    if (pool.connected) {
      const userCheck = await pool
        .request()
        .input("user_id", mssql.UniqueIdentifier, userId)
        .execute("social.GetUserByID");

      if (userCheck.recordset.length === 0) {
        // User not found
        throw new Error("User not found");
      }

      const user = userCheck.recordset[0];
      console.log(user);

      return user;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

module.exports = getUser;
