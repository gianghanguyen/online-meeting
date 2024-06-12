import { ApiProperty } from '@nestjs/swagger';
export class GroupInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  avtUrl: string;
}
