import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryDto {
  @ApiProperty({ required: false, example: 1 })
  @IsInt({ message: 'Page must be an integer number' })
  @Min(1, { message: 'Page must be larger than 1' })
  @Type(() => Number)
  page: number;

  @ApiProperty({ required: false, example: 1 })
  @IsInt({ message: 'Limit must be an integer number' })
  @Min(1, { message: 'Page must be larger than 1' })
  @Type(() => Number)
  limit: number;
}
