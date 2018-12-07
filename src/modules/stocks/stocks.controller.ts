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
  UseGuards,
} from '@nestjs/common';
import { Stocks } from './stocks.entity';
import { StocksService } from './stocks.service';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { StocksDto } from './stocks.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { User } from '../user/user.entity';
import { ActionDto } from '../action/action.dto';
import { Action } from '../action/action.entity';

@ApiUseTags('Stocks')
@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: `Get a list of user's stocks.`,
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

  @Post(':id/addAction')
  @ApiResponse({
    status: 201,
    description: 'Add an action for the stock',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad action',
  })
  async addAction(
    @Body() actionDto: ActionDto,
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<Action> {
    return this.stocksService.addAction(actionDto, id, loggedUser);
  }

  @Get(':id/actions')
  @ApiResponse({
    status: 200,
    description: `Return the stock's actions`,
  })
  async getActions(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<Action[]> {
    return this.stocksService.getActions(id, loggedUser);
  }

  @Get(':id/quantite')
  @ApiResponse({
    status: 200,
    description: `Return the stock's current quantity`,
  })
  async getQuantity(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() loggedUser: User,
  ): Promise<number> {
    return this.stocksService.getQuantity(id, loggedUser);
  }
}
