import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailSendDto {
  @ApiProperty({ example: 'username@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1' })
  groupId: number;
}
