import { createTransport } from 'nodemailer';
import { RESOURCE } from '../constants';
import { globalEnvironment } from "../config";

globalEnvironment();

export const transporter = createTransport({   
    service: RESOURCE.GMAIL,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD,
    },
});