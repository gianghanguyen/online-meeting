import { ApiProperty } from '@nestjs/swagger';

export class PasswordChangeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  newPassword: string;
}
