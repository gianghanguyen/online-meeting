import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GroupCreateDto {
  @ApiProperty({ example: 'Group name' })
  name: string;

  @ApiProperty({ example: 'this is group description' })
  @IsOptional()
  description: string;
}
