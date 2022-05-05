import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        // host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: false,
        auth: {
          user: process.env.NODEMAILER_SENDER_EMAIL,
          pass: process.env.EMAIL_SERVICE_PASS,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
