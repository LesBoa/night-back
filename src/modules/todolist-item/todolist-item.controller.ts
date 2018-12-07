import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodolistItem } from './todolist-item.entity';
import { TodolistItemService } from './todolist-item.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { TodolistItemDto } from './todolist-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../user/user.entity';

@ApiUseTags('Todolist item')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class TodolistItemController {
  constructor(private readonly todolistItemService: TodolistItemService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Todolist item.',
    type: TodolistItem,
    isArray: true,
  })
  getAll(): Promise<TodolistItem[]> {
    return this.todolistItemService.getAll();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of user's journal`,
    type: TodolistItem,
    isArray: true,
  })
  getAllbyUser(@CurrentUser() loggedUser: User): Promise<TodolistItem[]> {
    return this.todolistItemService.getAllByUser(loggedUser);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Todolist item has been created.',
    type: TodolistItem,
  })
  saveNew(
    @Body() todolistItemDto: TodolistItemDto,
    @CurrentUser() loggedUser: User,
  ): Promise<TodolistItem> {
    return this.todolistItemService.saveNew(todolistItemDto, loggedUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Todolist item with the matching id',
    type: TodolistItem,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<TodolistItem> {
    return (await this.todolistItemService.getOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated Todolist item with the matching id',
    type: TodolistItem,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() todolistItemDto: TodolistItemDto,
    @CurrentUser() loggedUser: User,
  ): Promise<TodolistItem> {
    return this.todolistItemService.update(id, todolistItemDto, loggedUser);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Todolist item with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<void> {
    await this.todolistItemService.deleteById(id, loggedUser);
  }
}
