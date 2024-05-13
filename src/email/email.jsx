import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const Email = ({
  borrowerName,
  borrowedAmount,
  loanDate,
  lenderName,
  lenderPaymentDetails,
}) => (
  <Html>
    <Head />
    <Preview>Your Debt story is waiting for you 🙂</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Text style={heading}>DEBT UPDATE</Text>
          <Text style={paragraph}>Hello {borrowerName},</Text>
        </Section>
        <Section style={paragraphList}>
          <Text style={paragraph}>
            We&apos;re writing to let you know about your debt story. You borrowed $
            {borrowedAmount} on {new Date(loanDate).toLocaleDateString()}.
          </Text>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            Your lender, {lenderName}, has provided the following payment
            details:
          </Text>
          <ul>
            {lenderPaymentDetails.map((payment, index) => (
              <li key={index} className="mb-4">
                <Text style={subHeading}>
                  Payment Method: {payment.paymentMethod}
                </Text>
                {payment.paymentMethod === "UPI" && (
                  <div>
                    <Text style={paragraph}>UPI ID: {payment.upiId}</Text>
                    <Text style={paragraph}>
                      UPI Number: {payment.upiNumber}
                    </Text>
                  </div>
                )}
                {payment.paymentMethod === "Bank Transfer" && (
                  <div>
                    <Text style={paragraph}>
                      Bank Account Number: {payment.accountNumber}
                    </Text>
                    <Text style={paragraph}>IFSC Code: {payment.ifscCode}</Text>
                  </div>
                )}
              </li>
            ))}
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
          <Text style={{ ...paragraph, fontSize: "20px" }}>
            The DedxDebt team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default Email;

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
