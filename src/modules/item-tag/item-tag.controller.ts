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
import { ItemTag } from './item-tag.entity';
import { ItemTagService } from './item-tag.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { ItemTagDto } from './item-tag.dto';

@ApiUseTags('Item tag')
@Controller()
// @ApiBearerAuth()
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

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Item tag has been created.',
    type: ItemTag,
  })
  saveNew(@Body() itemTagDto: ItemTagDto): Promise<ItemTag> {
    return this.itemTagService.saveNew(itemTagDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Item tag with the matching id',
    type: ItemTag,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ItemTag> {
    return (await this.itemTagService.getOneById(id)).orElseThrow(
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
  ): Promise<ItemTag> {
    return this.itemTagService.update(id, itemTagDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Item tag with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.itemTagService.deleteById(id);
  }
}
