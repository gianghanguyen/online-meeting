import {
  Controller,
  UseGuards,
  Get,
  Request,
  Body,
  Post,
} from '@nestjs/common';
import { GroupService } from './group.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { SuccessResponse } from 'src/common/response';
import { GroupResponseDto } from './dto/response/group.response.dto';
import { GroupCreateDto } from './dto/request/group.create.dto';
import { EmailSendDto } from './dto/request/email.send.dto';

@Controller('/groups')
@ApiBearerAuth()
@ApiTags('[User]Group')
@UseGuards(AuthGuard)
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  @ApiOperation({ summary: 'Get users list groups' })
  @ApiResponse({
    status: 200,
    description: 'Get users list group successful',
    type: SuccessResponse<GroupResponseDto[]>,
  })
  async getListGroups(
    @Request() request,
  ): Promise<SuccessResponse<GroupResponseDto[]>> {
    const userId = request.user.id;
    const listGroups = await this.groupService.getListGroups(userId);
    return SuccessResponse.make(listGroups);
  }

  @Post()
  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({
    status: 200,
    description: 'Get users list group successful',
    type: SuccessResponse<GroupResponseDto[]>,
  })
  async createGroup(
    @Request() request,
    @Body() groupCreateDto: GroupCreateDto,
  ): Promise<SuccessResponse<GroupResponseDto>> {
    const userId = request.user.id;
    const group = await this.groupService.createGroup(+userId, groupCreateDto);

    return SuccessResponse.make(group);
  }

  @Post('/send-email')
  @ApiOperation({ summary: 'Send group invite email' })
  @ApiResponse({
    status: 200,
    description: 'Send invite email successful',
    type: SuccessResponse<void>,
  })
  async sendEmail(
    @Request() request,
    @Body() emailSendDto: EmailSendDto,
  ): Promise<SuccessResponse<void>> {
    await this.groupService.sendInviteEmail(emailSendDto, +request.user.id);
    return SuccessResponse.make();
  }
}
