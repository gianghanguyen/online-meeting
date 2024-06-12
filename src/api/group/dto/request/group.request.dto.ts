import { ApiProperty } from '@nestjs/swagger';

export class GroupRequestDto {
  @ApiProperty({ example: 1 })
  groupId: number;
}
