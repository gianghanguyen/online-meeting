import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupResponseDto } from './dto/response/group.response.dto';
import { GroupCreateDto } from './dto/request/group.create.dto';
import { generateRandomString } from 'src/helper';
import { MailService } from 'src/mail/mail.service';
import { EmailSendDto } from './dto/request/email.send.dto';
// import { GroupAddUserDto } from './dto/request/group.add.user.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async getListGroups(userId: number): Promise<GroupResponseDto[]> {
    const userInGroup = await this.prismaService.useringroup.findMany({
      where: {
        userId: userId,
      },
      include: {
        group: true,
      },
    });

    const listGroups: GroupResponseDto[] = userInGroup.map((userGroup) => {
      return {
        id: userGroup.group.id,
        name: userGroup.group.name,
        avtUrl: userGroup.group.avtUrl,
        isOwner: userGroup.isOwner,
      };
    });

    return listGroups;
  }

  async createGroup(
    ownerId: number,
    groupCreateDto: GroupCreateDto,
  ): Promise<GroupResponseDto> {
    const token = generateRandomString(20);
    const newGroup = await this.prismaService.group.create({
      data: {
        name: groupCreateDto.name,
        description: groupCreateDto.description,
        token: token,
      },
      select: {
        id: true,
        name: true,
        avtUrl: true,
      },
    });

    await this.prismaService.useringroup.create({
      data: {
        groupId: newGroup.id,
        userId: ownerId,
        isOwner: true,
      },
    });

    return newGroup;
  }

  async sendInviteEmail(
    emaiSendDto: EmailSendDto,
    senderId: number,
  ): Promise<void> {
    const receiver = await this.prismaService.user.findUnique({
      where: {
        email: emaiSendDto.email,
      },
    });

    if (receiver.deactivate || !receiver) {
      throw new BadRequestException('User not found');
    }

    const inviteGroup = await this.prismaService.group.findUnique({
      where: {
        id: emaiSendDto.groupId,
      },
    });

    const sender = await this.prismaService.user.findUnique({
      where: {
        id: senderId,
      },
    });

    const inviteLink = process.env.CLIENT_URL + '/' + inviteGroup.token;

    const body = sender.name + ' has sent you an invite: ' + inviteLink;

    const subject = 'An invite from On-meeting';
    await this.mailService.sendEmail(receiver.email, subject, body, inviteLink);
  }

  // async addUserToGroup(userId: number, groupAddUserDto: GroupAddUserDto ): Promise<void> {
  //   const group = await this.prismaService.group.findUnique({
  //     where: {
  //       token: groupAddUserDto.token;
  //     }
  //   })
  // }
}
