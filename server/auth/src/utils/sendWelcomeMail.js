const { createTransport } = require("nodemailer");
require("dotenv").config();
const ejs = require('ejs');

const email_config = require('../config/emailConfig');
const transporter = createTransport(email_config);

async function sendWelcomeMail(email) {
  let htmlContent;
  try {
    htmlContent = await ejs.renderFile('./src/views/welcomeInfo.ejs', {
      sender: 'Vertives Inc.',
      username: 'Vertives'
    });
  } catch (error) {
    console.log(error);
  }

  let message_options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Vertives - Connect with Authenticity!",
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(message_options);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendWelcomeMail };