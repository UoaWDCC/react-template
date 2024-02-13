import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import '@react-email/tailwind';
import * as React from 'react';
import { config } from 'dotenv';

config();

const baseUrl = process.env.BASE_URL;

interface ContinueEmailProps {
  emailAddress: string;
  code: string;
  firstName?: string;
}

export const ContinueEmail = ({
  emailAddress,
  firstName,
  code,
}: ContinueEmailProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Continue with WDCC</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container
            key="container-1"
            className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]"
          >
            <Section
              key="section-1"
              className="mt-[32px]"
            >
              <Img
                src="https://wdcc.co.nz/static/media/primary_white_512.4c359cee.png"
                width="40"
                // height="37"
                alt="WDCC"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-2xl font-normal text-center p-0 my-[30px] mx-0">
              Continue through to <strong>WDCC</strong>
            </Heading>
            <Text className="text-black text-lg leading-lg">
              Kia Ora {firstName || 'Koe'} 🥰,
            </Text>
            <Text className="text-black text-lg leading-lg">
              We're confirming your email {emailAddress}.
            </Text>
            <Text className="text-black text-lg leading-lg">
              Please enter the following code in your app to continue to your
              account.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Text className="bg-[#222] rounded text-white text-2xl font-semibold no-underline text-center py-3 px-5">
                {code}
              </Text>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666] text-[12px] leading-[24px]">
              If you were not expecting this, you can ignore this email. If you
              are concerned about your account's safety, please reply to this
              email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
