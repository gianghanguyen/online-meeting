import { ApiProperty } from '@nestjs/swagger';

export class GroupAddUserDto {
  @ApiProperty({ example: 'token' })
  token: string;
}
