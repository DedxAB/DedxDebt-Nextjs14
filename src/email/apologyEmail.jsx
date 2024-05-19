import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const ApologyEmail = ({ borrowerName, apologyMessage }) => (
  <Html>
    <Head />
    <Preview>
      We send this email to apologize for the inconvenience caused.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Text style={heading}>APOLOGY</Text>
          <Text style={paragraph}>Hello, {borrowerName}</Text>
        </Section>

        <Section style={paragraphList}>
          <Text style={paragraph}>
            We apologize for the inconvenience caused. The lender has sent the
            debt details to you by mistake. Please ignore the previous email.
          </Text>
        </Section>
        {apologyMessage && (
          <Section style={paragraphList}>
            <Text style={paragraph}>
              <strong>Message from the lender :</strong> {apologyMessage}
            </Text>
          </Section>
        )}
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

export default ApologyEmail;

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
