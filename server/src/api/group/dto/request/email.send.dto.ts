import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class EmailSendDto {
  @ApiProperty({ example: 'username@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  groupId: number;
}
