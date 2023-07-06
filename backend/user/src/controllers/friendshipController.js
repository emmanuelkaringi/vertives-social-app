const config = require("../config/vertivesConfig");
const mssql = require("mssql");


async function getFollowers(req, res) {
    try {
        const { user_id } = req.params;
    
        // Create a new connection pool (you can configure the pool options as needed)
        const pool = new sql.ConnectionPool(/* pool options */);
        await pool.connect();
    
        // Create a new request instance
        const request = new sql.Request(pool);
    
        // Define the input parameter for the stored procedure
        request.input("user_id", sql.UniqueIdentifier, user_id);
    
        // Execute the stored procedure
        const result = await request.execute("social.GetFollowers");
    
        // Process the result and send the response
        const followers = result.recordset;
        res.json(followers);
      } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error occurred while getting followers:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } finally {
        // Close the connection pool
        pool.close();
      }
    }

async function getFollowing(req, res) {
    try {
        
    } catch (error) {
        
    }
 
}

async function followUser(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function unFollowUser(req, res) {
    try {
        
    } catch (error) {
        
    }
}


module.exports={ getFollowers, getFollowing, followUser, unFollowUser };