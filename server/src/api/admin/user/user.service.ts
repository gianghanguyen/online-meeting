import { PrismaService } from 'src/prisma/prisma.service';
import { generateRandomString } from 'src/helper';
import { UserCreateDto } from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserResponseDto } from './dto/user.response.dto';
import { MailService } from '../../../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async createUser(userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    const invalidEmail = await this.prismaService.user.count({
      where: {
        email: userCreateDto.email,
      },
    });

    if (invalidEmail) {
      throw new BadRequestException('email is already used');
    }

    const password = generateRandomString(8);
    console.log(password);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.prismaService.user.create({
      data: {
        name: userCreateDto.name,
        email: userCreateDto.email,
        password: hashedPassword,
        avtUrl: null,
        deactivate: false,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    //TODO: send password to user email
    const mailSubject = '[On-meeting]Admin has added your account';
    const mailBody = 'Your password: ' + password;
    await this.mailService.sendEmail(user.email, mailSubject, mailBody, null);

    return user;
  }
}
