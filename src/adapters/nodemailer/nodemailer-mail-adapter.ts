import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0e4e5d6a019519",
    pass: "b130101d6f2fc8",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget<oi@feedget.com>",
      to: "Lukas Henrique Braga Dias <diaslukas19@gmail.com>",
      subject,
      html: body,
    });
  }
}
