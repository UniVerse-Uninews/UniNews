"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/email-service.ts
var email_service_exports = {};
__export(email_service_exports, {
  sendPasswordResetEmail: () => sendPasswordResetEmail
});
module.exports = __toCommonJS(email_service_exports);
var import_nodemailer = __toESM(require("nodemailer"));
async function sendPasswordResetEmail(email, token) {
  const transporter = import_nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
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
              <p>UniNews &copy; ${(/* @__PURE__ */ new Date()).getFullYear()}</p>
            </div>
          </div>
        </body>
      </html>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Unable to send email");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendPasswordResetEmail
});
