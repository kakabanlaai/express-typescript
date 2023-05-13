import nodemailer, {TransportOptions} from 'nodemailer';
import config from '../config/config';

const transport = nodemailer.createTransport(
  config.email.smtp as TransportOptions
);
transport
  .verify()
  .then(() => console.log('Connected to email server'))
  .catch((err) => {
    console.log(err);
    console.log(
      'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
    );
  });

const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = {from: config.email.from, to, subject, text};
  await transport.sendMail(msg);
};

const sendVerificationEmail = async (to: string, token: string) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `http://localhost:5050/auth/verify-email?token=${token}`;
  const text = `
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const emailService = {
  sendEmail,
  sendVerificationEmail,
};

export default emailService;
