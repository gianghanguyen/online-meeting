import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user/user.module';
import { AuthModule } from './api/user/auth/auth.module';
import { UserManagementModule } from './api/admin/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    UserManagementModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
