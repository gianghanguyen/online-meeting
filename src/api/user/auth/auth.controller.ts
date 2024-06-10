import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { SuccessResponse } from 'src/common/response';
import { LoginResponseDto } from './dto/response/login.response.dto';

@Controller('/auth')
@ApiTags('[User]Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User login',
    type: SuccessResponse<LoginResponseDto>,
  })
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 201,
    description: 'create user successful',
    type: SuccessResponse<LoginResponseDto>,
  })
  async login(
    @Body() loginRequest: LoginRequestDto,
  ): Promise<SuccessResponse<LoginResponseDto>> {
    const response = await this.authService.login(loginRequest);
    return SuccessResponse.make(response);
  }
}
