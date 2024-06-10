import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { SuccessResponse } from 'src/common/response';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('admins/users')
@ApiTags('[Admin]Users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({
    status: 200,
    description: 'Get users profile',
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
