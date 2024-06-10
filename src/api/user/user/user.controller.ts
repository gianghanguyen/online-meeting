import {
  Controller,
  Query,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/response/user.response';
import { QueryDto } from '../../dto/query.dto';
import { SuccessResponse } from 'src/common/response';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/users')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get list users' })
  @ApiResponse({
    status: 200,
    description: 'Get list users successful',
    type: SuccessResponse<UserResponseDto[]>,
  })
  @Get()
  async getListUsers(
    @Query() queryDto: QueryDto,
  ): Promise<SuccessResponse<UserResponseDto[]>> {
    const listUsers = await this.userService.getListUsers(
      queryDto.page,
      queryDto.limit,
    );
    return SuccessResponse.make(listUsers);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: SuccessResponse<UserResponseDto>,
  })
  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<SuccessResponse<UserResponseDto>> {
    const user = await this.userService.getUserById(+id);
    return SuccessResponse.make(user);
  }

  @ApiOperation({ summary: 'Get users profile' })
  @ApiResponse({
    status: 200,
    description: 'Get users profile',
    type: SuccessResponse<UserResponseDto>,
  })
  @Get()
  async getProfile(
    @Request() request,
  ): Promise<SuccessResponse<UserResponseDto>> {
    const userId = request.user.id;
    const profile = await this.userService.getProfile(+userId);
    return SuccessResponse.make(profile);
  }
}
