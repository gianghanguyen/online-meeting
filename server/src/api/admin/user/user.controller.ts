import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { SuccessResponse } from 'src/common/response';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('admins/users')
@ApiTags('[Admin] User')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'Create user',
    type: SuccessResponse<UserResponseDto>,
  })
  @Post()
  async createUser(
    @Body() userCreateDto: UserCreateDto,
  ): Promise<SuccessResponse<UserResponseDto>> {
    const user = await this.userService.createUser(userCreateDto);
    return SuccessResponse.make(user);
  }
}
