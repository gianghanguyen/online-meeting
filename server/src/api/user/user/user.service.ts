import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './dto/response/user.response';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordChangeDto } from './dto/request/password.change.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getListUsers(page: number, limit: number): Promise<UserResponseDto[]> {
    const listUsers = await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        avtUrl: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return listUsers;
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        avtUrl: true,
      },
    });

    if (!user) {
      throw new BadRequestException('user not found');
    }
    return user;
  }

  async getProfile(id: number): Promise<UserResponseDto> {
    const profile = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        avtUrl: true,
      },
    });

    return profile;
  }

  async changePassword(
    id: number,
    passwordChangeDto: PasswordChangeDto,
  ): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isCorrectPassword = await bcrypt.compare(
      passwordChangeDto.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      passwordChangeDto.newPassword,
      salt,
    );

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async createUser(email: string): Promise<void> {
    await this.prismaService.user.create({
      data: {
        email: email,
        password: 'pass',
        avtUrl: null,
        deactivate: false,
      },
    });
  }
}
