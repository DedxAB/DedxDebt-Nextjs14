"use server";

import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import Email from "@/email/email";
import UpdateEmail from "@/email/updateEmail";
import ApologyEmail from "@/email/apologyEmail";
import ReturnAmountEmail from "@/email/returnAmountEmail";

export const sendEmail = async ({
  lenderName,
  lenderEmail,
  lenderPhoneNumber,
  borrowerName,
  borrowerEmail,
  loanAmount,
  loanDate,
  loanReason,
  paymentMethod,
  ticketId,
}) => {
  const customEmailSubject = "New Debt Notification 🚨";

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
    const emailHtml = render(
      <Email
        lenderName={lenderName}
        lenderEmail={lenderEmail}
        lenderPhoneNumber={lenderPhoneNumber}
        borrowerName={borrowerName}
        loanAmount={loanAmount}
        loanDate={loanDate}
        loanReason={loanReason}
        paymentMethod={paymentMethod}
        ticketId={ticketId}
      />,
      {
        pretty: true,
      }
    );

    const options = {
      from: {
        name: "DedxDebt - Debt Manager",
        address: process.env.USER_EMAIL,
      },
      to: borrowerEmail,
      subject: customEmailSubject,
      html: emailHtml,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.error(error);
  }
};

export const sendUpdatedTicketEmail = async ({
  lenderName,
  lenderEmail,
  lenderPhoneNumber,
  borrowerName,
  borrowerEmail,
  loanAmount,
  loanReason,
  loanDate,
  customEmailMessage,
  paymentMethod,
  ticketId,
}) => {
  const customEmailSubject = "Updated Debt Notification 🚨";
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
    const emailHtml = render(
      <UpdateEmail
        lenderName={lenderName}
        lenderEmail={lenderEmail}
        lenderPhoneNumber={lenderPhoneNumber}
        borrowerName={borrowerName}
        loanAmount={loanAmount}
        loanReason={loanReason}
        loanDate={loanDate}
        customEmailMessage={customEmailMessage}
        paymentMethod={paymentMethod}
        ticketId={ticketId}
      />,
      {
        pretty: true,
      }
    );

    const options = {
      from: {
        name: "DedxDebt - Debt Manager",
        address: process.env.USER_EMAIL,
      },
      to: borrowerEmail,
      subject: customEmailSubject,
      html: emailHtml,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.log(error);
  }
};

export const sendApologyMail = async ({
  borrowerName,
  borrowerEmail,
  apologyMessage,
}) => {
  const customEmailSubject = "Sorry for the inconvenience 🙏";
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
    const emailHtml = render(
      <ApologyEmail
        borrowerName={borrowerName}
        apologyMessage={apologyMessage}
      />,
      {
        pretty: true,
      }
    );

    const options = {
      from: {
        name: "DedxDebt - Debt Manager",
        address: process.env.USER_EMAIL,
      },
      to: borrowerEmail,
      subject: customEmailSubject,
      html: emailHtml,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.log(`Error sending mail: ${error}`);
  }
};

export const sendReturnAmountEmail = async ({
  lenderName,
  lenderEmail,
  lenderPhoneNumber,
  borrowerName,
  borrowerEmail,
  loanAmount,
  loanReason,
  loanDate,
  paymentMethod,
  ticketId,
  paybackAmount,
  paybackDate,
}) => {
  const customEmailSubject = "Paid Amount Notification 🚨";
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
    const emailHtml = render(
      <ReturnAmountEmail
        lenderName={lenderName}
        lenderEmail={lenderEmail}
        lenderPhoneNumber={lenderPhoneNumber}
        borrowerName={borrowerName}
        loanAmount={loanAmount}
        loanReason={loanReason}
        loanDate={loanDate}
        paymentMethod={paymentMethod}
        ticketId={ticketId}
        paybackAmount={paybackAmount}
        paybackDate={paybackDate}
      />,
      {
        pretty: true,
      }
    );

    const options = {
      from: {
        name: "DedxDebt - Debt Manager",
        address: process.env.USER_EMAIL,
      },
      to: borrowerEmail,
      subject: customEmailSubject,
      html: emailHtml,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.log(error);
  }
};
