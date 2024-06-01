import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import dayjs from "dayjs";

const ReturnAmountEmail = ({
  lenderName,
  lenderEmail,
  lenderPhoneNumber,
  borrowerName,
  loanAmount,
  loanReason,
  loanDate,
  paymentMethod,
  ticketId,
  paybackAmount,
  paybackDate,
}) => (
  <Html>
    <Head />
    <Preview>You recently paid back the amount.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Text style={heading}>DEBT UPDATE</Text>
          <Text style={paragraph}>Hello, {borrowerName}</Text>
          <Text style={paragraph}>
            Here is the summary of the amount you paid.
          </Text>
        </Section>

        <Section style={paragraphList}>
          <Text style={paragraph}>
            You paid <strong>₹{paybackAmount}</strong> on{" "}
            {dayjs(paybackDate).format("dddd MMM DD, YYYY")}.
          </Text>
          <Text style={paragraph}>
            You borrowed <strong>₹{loanAmount}</strong> on{" "}
            {dayjs(loanDate).format("dddd MMM DD, YYYY")} for{" "}
            {loanReason ? `${loanReason.toLowerCase()}.` : "personal reasons."}
          </Text>

          <Text style={paragraph}>
            You can preview your debt story by clicking{" "}
            <Link
              href={`https://dedxdebt.vercel.app/preview/${ticketId}/details`}
              style={link}
            >
              here
            </Link>
            .
          </Text>
        </Section>
        {Object.keys(paymentMethod).length > 0 && (
          <Section style={paragraphContent}>
            <Text style={paragraph}>
              Your lender, {lenderName} has provided the following payment
              details:
            </Text>
            {paymentMethod.upiId && (
              <Text style={paragraph}>UPI ID: {paymentMethod.upiId}</Text>
            )}
            {paymentMethod.upiNumber && (
              <Text style={paragraph}>
                UPI Number: {paymentMethod.upiNumber}
              </Text>
            )}
            {paymentMethod.bankAccount && (
              <>
                <Text style={paragraph}>
                  Bank Name: {paymentMethod.bankAccount.bankName}
                </Text>
                <Text style={paragraph}>
                  Account Number: {paymentMethod.bankAccount.accountNumber}
                </Text>
                <Text style={paragraph}>
                  IFSC Code: {paymentMethod.bankAccount.ifsc}
                </Text>
                <Text style={paragraph}>
                  Account Holder Name:{" "}
                  {paymentMethod.bankAccount.accountHolderName}
                </Text>
              </>
            )}
          </Section>
        )}
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            If you have any questions or concerns, please contact your lender.
          </Text>
          {lenderEmail && <Text style={paragraph}> mail : {lenderEmail} </Text>}
          {lenderPhoneNumber && (
            <Text style={paragraph}> phone : {lenderPhoneNumber} </Text>
          )}
        </Section>
        {Object.keys(paymentMethod).length > 0 && (
          <Section style={paragraphContent}>
            <Text style={paragraph}>
              You can repay the debt using the provided payment details. Please
              ensure to use the correct payment method as specified by the
              lender.
            </Text>
          </Section>
        )}
        <Section style={paragraphContent}>
          <Text style={paragraph}>Thank you,</Text>
          <Text style={{ ...paragraph, fontSize: "16px" }}>DedxDebt Team</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ReturnAmountEmail;

const main = {
  backgroundColor: "#dbddde",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "30px auto",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
};

const heading = {
  fontSize: "14px",
  lineHeight: "26px",
  fontWeight: "700",
  color: "#004dcf",
};

const subHeading = {
  fontSize: "12px",
  lineHeight: "24px",
  fontWeight: "700",
  color: "#004dcf",
};

const paragraphContent = {
  padding: "0 40px",
};

const paragraphList = {
  padding: "0 20px 0 40px",
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3c4043",
};

const link = {
  ...paragraph,
  color: "#004dcf",
};
