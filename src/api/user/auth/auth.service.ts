import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new BadRequestException(' wrong email');
    }

    const isCorrectPassword = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    if (user.deactivate) {
      throw new ForbiddenException('Account has been deleted');
    }

    const payload = {
      id: user.id,
      email: user.email,
      isUser: true,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRE,
      secret: process.env.JWT_SECRET,
    });

    return {
      token: accessToken,
    };
  }
}
