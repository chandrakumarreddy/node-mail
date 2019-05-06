const nodemailer = require("nodemailer");

module.exports = {
  async main(recipientMail, confirmationMail) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "your email",
        pass: "your password"
      }
    });
    try {
      let info = await transporter.sendMail({
        from: "from email",
        to: recipientMail,
        subject: "Hello ✔ ",
        text: `Hello world`,
        html:
          "To reset your password, click this <a href='" +
          confirmationMail +
          "'><span>link</span></a>.<br>This is a <b>test</b> email."
      });

      return info;
    } catch (err) {
      return err.message;
    }
  }
};
