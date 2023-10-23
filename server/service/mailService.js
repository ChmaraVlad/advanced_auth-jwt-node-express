
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.sendActivationLink = async (to, link) => {   
    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activate account on ` + process.env.API_URL,
      text: "",
      html: `
        <div>
            <h1>For Activate account go to link</h1>
            <a href="${link}">${link}</a>
        </div>
        `,
    });
}
