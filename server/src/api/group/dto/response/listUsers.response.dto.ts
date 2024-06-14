import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class ListUsersResponseDto {
  @ApiProperty()
  owner: UserResponseDto;

  @ApiProperty()
  members: UserResponseDto[];
}
