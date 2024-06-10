import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(email: string, subject: string, body: string, link: string) {
    const info = await this.mailerService.sendMail({
      to: email,
      subject: subject,
      text: body,
      html: `<a href="${link}">${link}</a>`,
    });
    console.log(info);
  }
}
