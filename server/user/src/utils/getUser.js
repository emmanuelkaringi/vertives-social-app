// getUser utility function
const config = require("../config/vertivesConfig");
const mssql = require("mssql");

async function getUser(username, email) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let userCheck = await sql
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

    let user = userCheck.recordset[0];
    console.log(user);

    return user;
  }
}

module.exports = getUser;
