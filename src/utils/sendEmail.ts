import nodemailer, { SendMailOptions } from 'nodemailer';
import { env } from './env.js';
import Mail from 'nodemailer/lib/mailer/index.js';
const transporter = nodemailer.createTransport({
  host: env('SMTP_SERVER') as string,
  port: Number(env('SMTP_PORT')),
  auth: {
    user: env('SMTP_LOGIN') as string,
    pass: env('SMTP_KEY') as string,
  },
});

export const sendEmail = async (options: SendMailOptions) => {
  const result = await transporter.sendMail(options);
  return result;
};
