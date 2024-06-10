import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 'user1@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'name' })
  @IsOptional()
  name: string;
}
