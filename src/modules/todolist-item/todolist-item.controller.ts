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

@ApiUseTags('Todolist item')
@Controller()
// @ApiBearerAuth()
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

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Todolist item has been created.',
    type: TodolistItem,
  })
  saveNew(@Body() todolistItemDto: TodolistItemDto): Promise<TodolistItem> {
    return this.todolistItemService.saveNew(todolistItemDto);
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
  ): Promise<TodolistItem> {
    return (await this.todolistItemService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
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
  ): Promise<TodolistItem> {
    return this.todolistItemService.update(id, todolistItemDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Todolist item with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.todolistItemService.deleteById(id);
  }
}
