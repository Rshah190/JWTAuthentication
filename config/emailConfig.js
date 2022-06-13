import dotenv from 'dotenv'
dotenv.config();
import nodemailer from 'nodemailer'

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Admin Gmail ID
      pass: process.env.EMAIL_PASS, // GMAIL PASSWORD
    },
  });

  export default transporter;