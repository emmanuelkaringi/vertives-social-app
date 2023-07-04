const config = require('../config/vertivesConfig');
const mssql = require('mssql');
const bcrypt = require('bcrypt');

module.exports = {
    createUser: async (req, res) => {
        try {
            let user = req.body;
            let hashedPwd = await bcrypt.hash(user.password, 8);

            let sql = await mssql.connect(config);
            if (sql.connected) {
                let emailCheck = await sql.request()
                    .input("email", user.email)
                    .query("SELECT * FROM social.user_profile WHERE email = @email");

                if (emailCheck.recordset.length > 0) {
                    return res.status(400).json({ error: "User already exists" });
                }

                let usernameCheck = await sql.request()
                    .input("username", user.username)
                    .query("SELECT * FROM social.user_profile WHERE username = @username");

                if (usernameCheck.recordset.length > 0) {
                    return res.status(400).json({ error: "The username already exists" });
                }

                let results = await sql.request()
                    .input("full_name", user.full_name)
                    .input("username", user.username)
                    .input("email", user.email)
                    .input("DOB", user.DOB)
                    .input("city", user.city)
                    .input("profilepic_url", user.profilepic_url)
                    .input("password", hashedPwd)
                    .execute("social.CreateUser");

                console.log(results);

                res.json({
                    success: true,
                    message: "User created successfully",
                    results: results.recordsets[0]
                });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    loginUser: async (req, res) => {
        let { username, email, password } = req.body;
        try {
            let sql = await mssql.connect(config);
            if (sql.connected) {
                // Check if user exists
                let userCheck = await sql.request()
                    .input("username", username)
                    .input("email", email)
                    .query("SELECT * FROM social.user_profile WHERE username = @username OR email = @email");
    
                if (userCheck.recordset.length === 0) {
                    // User not found
                    return res.status(404).json({ error: "User not found" });
                }
    
                let matchedUser = null;
                for (let user of userCheck.recordset) {
                    // Compare the provided password with the stored password
                    let passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) {
                        matchedUser = user;
                        break;
                    }
                }
    
                if (!matchedUser) {
                    // Incorrect password
                    return res.status(401).json({ error: "Incorrect password" });
                }
    
                // Successful login
                res.json({
                    success: true,
                    message: "Login successful",
                    user: {
                        user_id: matchedUser.user_id,
                        full_name: matchedUser.full_name,
                        username: matchedUser.username,
                        email: matchedUser.email,
                        DOB: matchedUser.DOB,
                        city: matchedUser.city,
                        profilepic_url: matchedUser.profilepic_url
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    
};