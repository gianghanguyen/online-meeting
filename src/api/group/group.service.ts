import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupResponseDto } from './dto/response/group.response.dto';
import { GroupCreateDto } from './dto/request/group.create.dto';
import { generateRandomString } from 'src/helper';
import { MailService } from 'src/mail/mail.service';
import { EmailSendDto } from './dto/request/email.send.dto';
import { GroupAddUserDto } from './dto/request/group.add.user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { GroupInfoDto } from './dto/response/group.info.dto';
import { ListUsersResponseDto } from './dto/response/listUsers.response.dto';

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

  async getGroupInfo(userId: number, groupId: number): Promise<GroupInfoDto> {
    const userInGroup = await this.prismaService.useringroup.findUnique({
      where: {
        userId_groupId: {
          userId: userId,
          groupId: groupId,
        },
      },
      select: {
        group: true,
      },
    });

    if (!userInGroup) {
      throw new ForbiddenException('No access to this group');
    }

    return {
      id: userInGroup.group.id,
      name: userInGroup.group.name,
      description: userInGroup.group.description,
      avtUrl: userInGroup.group.avtUrl,
    };
  }

  async getListUsersInGroup(
    userId: number,
    groupId: number,
  ): Promise<ListUsersResponseDto> {
    const userInGroup = await this.prismaService.useringroup.findUnique({
      where: {
        userId_groupId: {
          userId: userId,
          groupId: groupId,
        },
      },
    });

    if (!userInGroup) {
      throw new ForbiddenException('No access to this group');
    }

    const listUsersInGroup = await this.prismaService.useringroup.findMany({
      where: {
        groupId: groupId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avtUrl: true,
          },
        },
        isOwner: true,
      },
    });

    let owner: UserResponseDto;
    const members: UserResponseDto[] = [];

    listUsersInGroup.forEach((user) => {
      if (user.isOwner)
        owner = {
          id: user.user.id,
          name: user.user.name,
          email: user.user.email,
          avtUrl: user.user.avtUrl,
        };
      else {
        members.push({
          id: user.user.id,
          name: user.user.name,
          email: user.user.email,
          avtUrl: user.user.avtUrl,
        });
      }
    });

    return {
      owner: owner,
      members: members,
    };
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

    if (!receiver || receiver.deactivate) {
      throw new BadRequestException('User not found');
    }

    const inviteGroup = await this.prismaService.group.findUnique({
      where: {
        id: emaiSendDto.groupId,
      },
    });

    const sender = await this.prismaService.useringroup.findUnique({
      where: {
        userId_groupId: {
          userId: senderId,
          groupId: emaiSendDto.groupId,
        },
      },
      select: {
        user: true,
      },
    });

    if (!sender) {
      throw new UnauthorizedException('No access to this group');
    }

    const inviteLink = process.env.CLIENT_URL + '/' + inviteGroup.token;

    const body = sender.user.name + ' has sent you an invite: ' + inviteLink;

    const subject = 'An invite from On-meeting';
    await this.mailService.sendEmail(receiver.email, subject, body, inviteLink);
  }

  async addUserToGroup(
    userId: number,
    groupAddUserDto: GroupAddUserDto,
  ): Promise<GroupResponseDto> {
    const group = await this.prismaService.group.findUnique({
      where: {
        token: groupAddUserDto.token,
      },
    });

    if (!group) {
      throw new BadRequestException('Group doesnt exist');
    }

    const user = await this.prismaService.useringroup.findUnique({
      where: {
        userId_groupId: {
          userId: userId,
          groupId: group.id,
        },
      },
      select: {
        user: true,
      },
    });

    if (user) {
      throw new BadRequestException('User is already in group');
    }

    await this.prismaService.useringroup.create({
      data: {
        userId: userId,
        groupId: group.id,
        isOwner: false,
      },
    });

    return {
      id: group.id,
      name: group.name,
      avtUrl: group.avtUrl,
    };
  }

  async deleteUserInGroup(
    userId: number,
    groupId: number,
    deleteUserId: number,
  ): Promise<void> {
    const isUserOwner = await this.prismaService.useringroup.findUnique({
      where: {
        userId_groupId: {
          userId: userId,
          groupId: groupId,
        },
      },
      select: {
        isOwner: true,
      },
    });

    if (!isUserOwner || !isUserOwner.isOwner) {
      throw new ForbiddenException('No access to this group');
    }

    const deleteUserInGroup = await this.prismaService.useringroup.findUnique({
      where: {
        userId_groupId: {
          userId: deleteUserId,
          groupId: groupId,
        },
      },
    });

    if (!deleteUserInGroup) {
      throw new BadRequestException('User is not in group');
    }

    await this.prismaService.useringroup.delete({
      where: {
        userId_groupId: {
          userId: deleteUserId,
          groupId: groupId,
        },
      },
    });
  }

  async deleteGroup(userId: number, groupId: number): Promise<void> {
    const userInGroup = await this.prismaService.useringroup.findUnique({
      where: {
        userId_groupId: {
          userId: userId,
          groupId: groupId,
        },
      },
      select: {
        group: true,
        isOwner: true,
      },
    });
    console.log(userInGroup);

    if (!userInGroup || !userInGroup.isOwner) {
      throw new ForbiddenException('No access to this group');
    }

    await this.prismaService.useringroup.deleteMany({
      where: {
        groupId: groupId,
      },
    });

    await this.prismaService.group.delete({
      where: {
        id: groupId,
      },
    });
  }
}
