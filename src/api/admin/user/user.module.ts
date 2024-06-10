import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [JwtService, UserService, PrismaService],
  controllers: [UserController],
})
export class UserManagementModule {}
