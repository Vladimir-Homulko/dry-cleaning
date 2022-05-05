import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {UserDocument} from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    public async sendForgotPasswordConfirmation(user: UserDocument, token: string) {
        await this.mailerService.sendMail({
            to: user.email,
            from: `"No Reply" <process.env.NODEMAILER_SENDER_EMAIL>`,
            subject: 'Reset Password',
            html: `<p>Hello <b>${user.name}</b></p>
      <p>You have made a request to reset your password.</p>
      <p>If you did not made any request to reset your password please ignore this email!.</p>
      <p>Please click on the link below in other to reset your password</p>
      <a target='_' href=${process.env.DOMAIN}${process.env.token}/auth/reset-password/${token}> <b>Click here</b></a>
      </div>`,
        });
    }
}
