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
import { Stocks } from './stocks.entity';
import { StocksService } from './stocks.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { StocksDto } from './stocks.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../user/user.entity';

@ApiUseTags('Stocks')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Stocks.',
    type: Stocks,
    isArray: true,
  })
  getAll(): Promise<Stocks[]> {
    return this.stocksService.getAll();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all Stocks.',
    type: Stocks,
    isArray: true,
  })
  getAllbyUser(@CurrentUser() loggedUser: User): Promise<Stocks[]> {
    return this.stocksService.getAllByUser(loggedUser);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The Stocks has been created.',
    type: Stocks,
  })
  saveNew(
    @Body() stocksDto: StocksDto,
    @CurrentUser() loggedUser: User,
  ): Promise<Stocks> {
    return this.stocksService.saveNew(stocksDto, loggedUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The Stocks with the matching id',
    type: Stocks,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<Stocks> {
    return (await this.stocksService.getOneById(id, loggedUser)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated Stocks with the matching id',
    type: Stocks,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() stocksDto: StocksDto,
    @CurrentUser() loggedUser: User,
  ): Promise<Stocks> {
    return this.stocksService.update(id, stocksDto, loggedUser);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The Stocks with the matching id was deleted',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<void> {
    await this.stocksService.deleteById(id, loggedUser);
  }
}
