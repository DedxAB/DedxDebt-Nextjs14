import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import dayjs from "dayjs";
import * as React from "react";

const UpdateEmail = ({
  lenderName,
  borrowerName,
  loanAmount,
  loanReason,
  loanDate,
  customEmailMessage,
}) => (
  <Html>
    <Head />
    <Preview>
      {customEmailMessage || "Checkout the updated debt details..."}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Text style={heading}>DEBT UPDATE</Text>
          <Text style={paragraph}>Hello, {borrowerName}</Text>
          <Text style={paragraph}>Here is the updated debt details.</Text>
        </Section>

        <Section style={paragraphList}>
          <Text style={paragraph}>
            We&apos;re writing to let you know about your debt story. You
            borrowed <strong>₹{loanAmount}</strong> on{" "}
            {dayjs(loanDate).format("dddd MMM DD, YYYY")} for{" "}
            {loanReason ? `${loanReason.toLowerCase()}.` : "personal reasons."}
          </Text>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            Your lender, {lenderName} has provided the following payment
            details:
          </Text>
          <ul>
            <li style={paragraph}>UPI ID: arnab.5547@sbi</li>
            <li style={paragraph}>UPI Number: 8597605547</li>
          </ul>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            If you have any questions or concerns, please contact your lender.
          </Text>
          <ul>
            <li style={paragraph}> Email: arnab.officialcorp@gmail.com </li>
            <li style={paragraph}> Phone: 8597605547 </li>
          </ul>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            You can repay the debt using the provided payment details. Please
            ensure to use the correct payment method as specified by the lender.
          </Text>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>Thank you,</Text>
          <Text style={{ ...paragraph, fontSize: "16px" }}>
            The DedxDebt Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default UpdateEmail;

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
  paddingLeft: 40,
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
