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
import { ItemTag } from './item-tag.entity';
import { ItemTagService } from './item-tag.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { ItemTagDto } from './item-tag.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../user/user.entity';

@ApiUseTags('Item tag')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ItemTagController {
  constructor(private readonly itemTagService: ItemTagService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Item tag.',
    type: ItemTag,
    isArray: true,
  })
  getAll(): Promise<ItemTag[]> {
    return this.itemTagService.getAll();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of user's journal`,
    type: ItemTag,
    isArray: true,
  })
  getAllbyUser(@CurrentUser() loggedUser: User): Promise<ItemTag[]> {
    return this.itemTagService.getAllByUser(loggedUser);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Item tag has been created.',
    type: ItemTag,
  })
  saveNew(
    @Body() itemTagDto: ItemTagDto,
    @CurrentUser() loggedUser: User,
  ): Promise<ItemTag> {
    return this.itemTagService.saveNew(itemTagDto, loggedUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Item tag with the matching id',
    type: ItemTag,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<ItemTag> {
    return (await this.itemTagService.getOneById(id, loggedUser)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated Item tag with the matching id',
    type: ItemTag,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() itemTagDto: ItemTagDto,
    @CurrentUser() loggedUser: User,
  ): Promise<ItemTag> {
    return this.itemTagService.update(id, itemTagDto, loggedUser);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Item tag with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<void> {
    await this.itemTagService.deleteById(id, loggedUser);
  }
}
