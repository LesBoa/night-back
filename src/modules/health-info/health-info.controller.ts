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
import { HealthInfo } from './health-info.entity';
import { HealthInfoService } from './health-info.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { HealthInfoDto } from './health-info.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../user/user.entity';

@ApiUseTags('Health info')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class HealthInfoController {
  constructor(private readonly healthInfoService: HealthInfoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Health info.',
    type: HealthInfo,
    isArray: true,
  })
  getAll(): Promise<HealthInfo[]> {
    return this.healthInfoService.getAll();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of user's HealthInfo`,
    type: HealthInfo,
    isArray: true,
  })
  getAllbyUser(@CurrentUser() loggedUser: User): Promise<HealthInfo[]> {
    return this.healthInfoService.getAllByUser(loggedUser);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Health info has been created.',
    type: HealthInfo,
  })
  saveNew(
    @Body() healthInfoDto: HealthInfoDto,
    @CurrentUser() loggedUser: User,
  ): Promise<HealthInfo> {
    return this.healthInfoService.saveNew(healthInfoDto, loggedUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Health info with the matching id',
    type: HealthInfo,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<HealthInfo> {
    return (await this.healthInfoService.getOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated Health info with the matching id',
    type: HealthInfo,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() healthInfoDto: HealthInfoDto,
    @CurrentUser() loggedUser: User,
  ): Promise<HealthInfo> {
    return this.healthInfoService.update(id, healthInfoDto, loggedUser);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Health info with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<void> {
    await this.healthInfoService.deleteById(id, loggedUser);
  }
}
