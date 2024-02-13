import { SendMailOptions, createTransport } from 'nodemailer';
import { ContinueEmail } from './templates/continue';
import { render } from '@react-email/render';
import { config } from 'dotenv';

config();

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
console.log(`smtpUser = ${smtpUser}, smtpPass = ${smtpPass}`);

const mailTransporter = createTransport({
  service: 'gmail',
  pool: true,
  secure: true,
  port: 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export async function sendContinueEmail(
  emailAddress: string,
  code: string,
  firstName?: string
) {
  const emailHtml = render(
    ContinueEmail({
      emailAddress,
      code,
      firstName,
    })
  );

  const mailDetails: SendMailOptions = {
    from: `Alex from WDCC <${smtpUser}>`,
    to: emailAddress,
    subject: `Continue to your WDCC React Template Account`,
    html: emailHtml,
  };
  await mailTransporter.sendMail(mailDetails);
}
