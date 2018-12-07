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
import { HealthType } from './health-type.entity';
import { HealthTypeService } from './health-type.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { HealthTypeDto } from './health-type.dto';

@ApiUseTags('Health type')
@Controller()
// @ApiBearerAuth()
export class HealthTypeController {
  constructor(private readonly healthTypeService: HealthTypeService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Health type.',
    type: HealthType,
    isArray: true,
  })
  getAll(): Promise<HealthType[]> {
    return this.healthTypeService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Health type has been created.',
    type: HealthType,
  })
  saveNew(@Body() healthTypeDto: HealthTypeDto): Promise<HealthType> {
    return this.healthTypeService.saveNew(healthTypeDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Health type with the matching id',
    type: HealthType,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<HealthType> {
    return (await this.healthTypeService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated Health type with the matching id',
    type: HealthType,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() healthTypeDto: HealthTypeDto,
  ): Promise<HealthType> {
    return this.healthTypeService.update(id, healthTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Health type with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.healthTypeService.deleteById(id);
  }
}
