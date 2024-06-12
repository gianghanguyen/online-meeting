import {
  Controller,
  UseGuards,
  Get,
  Request,
  Body,
  Post,
  Delete,
  Param,
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
import { GroupAddUserDto } from './dto/request/group.add.user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';

@Controller('/groups')
@ApiBearerAuth()
@ApiTags('[User] Group')
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

  @Get(':id/users')
  @ApiOperation({ summary: 'Get list users in groups' })
  @ApiResponse({
    status: 200,
    description: 'Get list users in group successful',
    type: SuccessResponse<UserResponseDto[]>,
  })
  async getListUsersInGroup(
    @Request() request,
    @Param('id') groupId: string,
  ): Promise<SuccessResponse<UserResponseDto[]>> {
    const userId = request.user.id;
    const listUsersInGroup = await this.groupService.getListUsersInGroup(
      userId,
      Number(groupId),
    );
    return SuccessResponse.make(listUsersInGroup);
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

  @Post('/send-invite-email')
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
    await this.groupService.sendInviteEmail(emailSendDto, request.user.id);
    return SuccessResponse.make();
  }

  @Post('/users')
  @ApiOperation({ summary: 'Add user to group' })
  @ApiResponse({
    status: 200,
    description: 'Add user to group',
    type: SuccessResponse<GroupResponseDto>,
  })
  async addUserToGroup(
    @Body() groupAddUserDto: GroupAddUserDto,
    @Request() request,
  ): Promise<SuccessResponse<GroupResponseDto>> {
    const userId = request.user.id;
    const group = await this.groupService.addUserToGroup(
      userId,
      groupAddUserDto,
    );
    return SuccessResponse.make(group);
  }

  @Delete(':groupId/users/:deleteId')
  @ApiOperation({ summary: 'Delete user in group' })
  @ApiResponse({
    status: 200,
    description: 'Delete user in group',
    type: SuccessResponse<void>,
  })
  async deleteUserInGroup(
    @Param('groupId') groupId: string,
    @Param('deleteId') deleteId: string,
    @Request() request,
  ): Promise<SuccessResponse<void>> {
    const userId = request.user.id;
    await this.groupService.deleteUserInGroup(
      userId,
      Number(groupId),
      Number(deleteId),
    );
    return SuccessResponse.make();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete group' })
  @ApiResponse({
    status: 200,
    description: 'Delete group successful',
    type: SuccessResponse<void>,
  })
  async deleteGroup(
    @Param('id') groupId: string,
    @Request() request,
  ): Promise<SuccessResponse<void>> {
    const userId = request.user.id;
    await this.groupService.deleteGroup(userId, Number(groupId));
    return SuccessResponse.make();
  }
}
