import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupService } from './group.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { GroupController } from './group.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  providers: [GroupService, PrismaService, JwtService],
  controllers: [GroupController],
})
export class GroupModule {}
