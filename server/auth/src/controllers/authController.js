const bcrypt = require("bcrypt");
const getUser = require("../utils/getUser");
const {sendWelcomeMail} = require("../utils/sendWelcomeMail")
const email_config = require("../config/emailConfig");
const { createTransport } = require("nodemailer");

module.exports = {
  createUser: async (req, res) => {
    try {
      let user = req.body;
      let hashedPwd = await bcrypt.hash(user.password, 8);

      const pool = req.pool;
      if (pool.connected) {
        let emailCheck = await pool.request()
          .input("email", user.email)
          .query("SELECT * FROM social.user_profile WHERE email = @email");

        if (emailCheck.recordset.length > 0) {
          return res.status(400).json({ error: "User already exists" });
        }

        let usernameCheck = await pool.request()
          .input("username", user.username)
          .query("SELECT * FROM social.user_profile WHERE username = @username");

        if (usernameCheck.recordset.length > 0) {
          return res.status(400).json({ error: "The username already exists" });
        }

        let results = await pool.request()
          .input("full_name", user.full_name)
          .input("username", user.username)
          .input("email", user.email)
          .input("DOB", user.DOB)
          .input("city", user.city)
          .input("profilepic_url", user.profilepic_url)
          .input("password", hashedPwd)
          .execute("social.CreateUser");

        console.log(results);

        const transporter = createTransport(email_config);
        await sendWelcomeMail(user.email, transporter);

        res.json({
          success: true,
          message: "User created successfully",
          results: results.recordsets[0],
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  loginUser: async (req, res) => {
    let { username, email, password } = req.body;
    const pool = req.pool;
  
    try {
      let user = await getUser(username, email, pool);
  
      if (!user) {
        return res.status(404).json({ error: "User not found. Please check your email/username and password." });
      }
  
      // Check if the user account is deleted
      if (user.is_deleted === 1) {
        return res.status(401).json({ error: "Your account has been deleted. Please contact support for assistance." });
      }
  
      let passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect password. Please try again." });
      }
      req.session.authorized = true;
      req.session.user = user;
  
      res.json({
        success: true,
        message: "Login successful",
        user: user,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  logoutUser: async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send("Error logging out");
      } else {
        res.send("Logged out successfully");
      }
    });
  },
};