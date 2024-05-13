"use server";

import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import Email from "@/email/email";

export const sendEmail = async (email, text, borrowerName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const emailHtml = render(<Email borrowerName={borrowerName} />, {
      pretty: true,
    });

    const options = {
      from: {
        name: "DedxDebt",
        address: process.env.USER_EMAIL,
      },
      to: email,
      subject: text,
      html: emailHtml,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.error(error);
  }
};
