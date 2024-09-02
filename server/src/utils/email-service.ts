import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: `"UniNews" <${process.env.EMAIL_USER}>`, 
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Use the following token to reset your password: ${token}`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            .header {
              background-color: #007bff;
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .header img {
              width: 120px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888888;
              padding: 10px;
              background-color: #f4f4f4;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              font-size: 16px;
              color: #ffffff;
              background-color: #F2A20C;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }

            .button:hover {
              background-color: #fac93b;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="http://projetoscti.com.br/projetoscti27/uninews/img/tcc-logo-quadrado-sem-fundo.png" alt="UniNews Logo">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>You requested a password reset. Use the following token to reset your password:</p>
              <p><strong>${token}</strong></p>
              <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>UniNews &copy; ${new Date().getFullYear()}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email");
  }
}
