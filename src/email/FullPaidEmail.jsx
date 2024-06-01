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

const FullPaidEmail = ({ borrowerName, message, lenderEmail, ticketId }) => (
  <Html>
    <Head />
    <Preview>You paid the full amount of the debt.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Text style={heading}>DEBT UPDATE</Text>
          <Text style={paragraph}>Hello, {borrowerName}</Text>
          <Text style={paragraph}>
            You have successfully paid the full amount of the debt. 🎉
          </Text>
        </Section>

        <Section style={paragraphList}>
          {message && (
            <Text style={paragraph}>Lender&apos;s message : {message}</Text>
          )}

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

        <Section style={paragraphContent}>
          <Text style={paragraph}>
            If you have any questions or concerns, please contact your lender.
          </Text>
          {lenderEmail && <Text style={paragraph}> mail : {lenderEmail} </Text>}
        </Section>

        <Section style={paragraphContent}>
          <Text style={paragraph}>Thank you,</Text>
          <Text style={{ ...paragraph, fontSize: "16px" }}>
            <Link href="https://dedxdebt.vercel.app">DedxDebt Team</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default FullPaidEmail;

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
