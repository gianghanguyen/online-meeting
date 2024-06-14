import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'username@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'KzQX9vqr' })
  password: string;
}
