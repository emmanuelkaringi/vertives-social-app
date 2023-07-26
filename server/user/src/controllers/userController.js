const config = require("../config/vertivesConfig");
const mssql = require("mssql");
const getUser = require("../utils/getUser");

async function getAllProfiles(req, res) {
  try {
    const pool = await mssql.connect(config);

    if (pool.connected) {
      const result = await pool.request().execute("social.GetAllProfiles");

      res.json({
        success: true,
        message: "Profiles retrieved successfully",
        data: [...result.recordset,]
      });
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUserProfile(req, res) {
  try {
    const userId = req.params.userId; // Get the user_id from the request parameters

    const user = await getUser(userId);

    const userProfile = {
      user_id: user.user_id,
      full_name: user.full_name,
      username: user.username,
      profilepic_url: user.profilepic_url,
      city: user.city,
      DOB: user.DOB,
    };

    res.json(userProfile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateUserProfile(req, res) {
  try {
    const userId = req.params.userId;
    const { full_name, username, DOB, city, profilepic_url, coverpic_url } =
      req.body;

    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .input("user_id", userId)
      .input("full_name", full_name)
      .input("username", username)
      .input("DOB", DOB)
      .input("city", city)
      .input("profilepic_url", profilepic_url)
      .execute("social.UpdateUser");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUserProfile(req, res) {
  try {
    const userId = req.params.userId;
    const pool = await mssql.connect(config);

    if (pool.connected) {
      const request = pool.request();
      request.input("user_id", mssql.UniqueIdentifier, userId);
      const result = await request.execute("social.DeleteAccount");

      console.log(result);

      // Check if any rows were affected by the delete operation
      const rowsAffected =
        result?.rowsAffected?.reduce((sum, val) => sum + val, 0) || 0;
      if (rowsAffected === 0) {
        return res.status(404).json({ message: "User profile not found" });
      }

      return res.json({ message: "User profile deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updatePassword(req, res) {
  try {
    const userId = req.params.userId;
    const new_password = req.body.new_password;

    const pool = await mssql.connect(config);

    const result = await pool
      .request()
      .input("user_id", mssql.UniqueIdentifier, userId)
      .input("new_password", mssql.VarChar(255), new_password)
      .execute("social.updatePassword");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function searchUsers(req, res) {
  try {
    const { search_query } = req.params; // Get the search query from the request query parameters

    const pool = await mssql.connect(config);

    if (pool.connected) {
      const request = pool.request();
      request.input("search_query", mssql.NVarChar(100), search_query);
      const result = await request.execute("social.SearchUsers");

      res.json({
        success: true,
        message: "Search results retrieved successfully",
        data: result.recordset,
      });
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllProfiles,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  updatePassword,
  searchUsers
};
