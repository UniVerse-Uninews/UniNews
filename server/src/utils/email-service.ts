import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use o serviço de e-mail apropriado
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail
      pass: process.env.EMAIL_PASS, // Sua senha de e-mail (ou senha de app para Gmail)
    },
  });

  const mailOptions = {
    from: `"YourApp Name" <${process.env.EMAIL_USER}>`, // Remetente
    to: email, // Destinatário
    subject: "Password Reset Request",
    text: `You requested a password reset. Use the following token to reset your password: ${token}`,
    html: `<p>You requested a password reset. Use the following token to reset your password:</p><p><strong>${token}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email");
  }
}
