import nodemailer from 'nodemailer';
import config from "../../../config/config.js";

const transporter = nodemailer.createTransport({
  host: config.mail.nodemailer.host,
  port: config.mail.nodemailer.port,
  secure: config.mail.nodemailer.secure,
  auth: {
    user: config.mail.nodemailer.auth.user,
    pass: config.mail.nodemailer.auth.pass
  }
});

export default transporter
