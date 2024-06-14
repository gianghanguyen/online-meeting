import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  avtUrl: string;

  @ApiProperty()
  id: number;
}
