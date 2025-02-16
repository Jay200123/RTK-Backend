import { transporter } from '../config';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import juice from 'juice';
import { SentMessageInfo } from 'nodemailer';


/**
 * Send an email with a precompiled HTML template.
 * @param email - Recipient's email address
 * @param message - Data to inject into the email template
 * @returns A promise that resolves when the email is sent
 */
const sendEmail = (email: string, message: string): Promise<SentMessageInfo> => {
  const mailPath = path.join(__dirname, '../public/index.html');    
  
  const content = fs.readFileSync(mailPath, 'utf8');
  const template = handlebars.compile(content);

  const replacement = { message };
  const renderedHtml = template(replacement);

  const inlineHtml = juice(renderedHtml);

  return transporter.sendMail({
    from: process.env.EMAIL, 
    to: email, 
    subject: 'Reset Password OTP',
    html: inlineHtml,
  });
};

export { sendEmail };