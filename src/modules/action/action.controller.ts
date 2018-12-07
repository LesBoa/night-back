import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Action } from './action.entity';
import { ActionService } from './action.service';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../user/user.entity';

@ApiUseTags('Action')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of user's stocks.`,
    type: Action,
    isArray: true,
  })
  getAllbyUser(@CurrentUser() loggedUser: User): Promise<Action[]> {
    return this.actionService.getAllByUser(loggedUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Action with the matching id',
    type: Action,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<Action> {
    return (await this.actionService.getOneById(id, loggedUser)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Action with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<void> {
    await this.actionService.deleteById(id, loggedUser);
  }
}
