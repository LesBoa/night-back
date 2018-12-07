import { Stocks } from './stocks.entity';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StocksRepository } from './stocks.repository';
import { StocksDto } from './stocks.dto';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { ActionService } from '../action/action.service';
import { ActionDto } from '../action/action.dto';
import { Action } from '../action/action.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StocksRepository)
    private readonly stocksRepository: StocksRepository,
    @Inject(forwardRef(() => ActionService))
    private readonly actionService: ActionService,
  ) {}

  async getAll(): Promise<Stocks[]> {
    return this.stocksRepository.find({});
  }

  async getOneById(id: number, loggedUser: User): Promise<Optional<Stocks>> {
    return this.stocksRepository.findOneById(id, loggedUser);
  }

  async getAllByUser(user: User): Promise<Stocks[]> {
    return this.stocksRepository.findAllByUser(user);
  }

  async saveNew(body: StocksDto, loggedUser: User): Promise<Stocks> {
    let stocksNew = new Stocks();

    stocksNew.name = body.name;
    stocksNew.quantity = body.quantity;
    stocksNew.unit = body.unit;
    stocksNew.user = loggedUser;

    stocksNew = await this.stocksRepository.save(stocksNew);

    return stocksNew;
  }

  async update(id: number, body: StocksDto, loggedUser: User): Promise<Stocks> {
    let stocksFound = (await this.stocksRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());

    stocksFound.name = body.name;
    stocksFound.quantity = body.quantity;
    stocksFound.unit = body.unit;
    stocksFound.user = loggedUser;

    stocksFound = await this.stocksRepository.save(stocksFound);

    return stocksFound;
  }

  async deleteById(id: number, loggedUser: User): Promise<void> {
    const stocksFound = (await this.stocksRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    await this.stocksRepository.remove(stocksFound);
  }

  async addAction(
    body: ActionDto,
    id: number,
    loggedUser: User,
  ): Promise<Action> {
    const actionsFounds: Action[] = await this.actionService.getAllByUser(
      loggedUser,
    );
    let variationTotale = 0;
    actionsFounds.forEach(action => {
      variationTotale += action.quantity;
    });
    const actionNew = new Action();
    const stocksFound = (await this.stocksRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());

    if (stocksFound.quantity + variationTotale > 0) {
      actionNew.name = body.name;
      actionNew.quantity = body.quantity;
      actionNew.icon = body.icon;
      actionNew.stocks = stocksFound;
      actionNew.user = loggedUser;
      return await this.actionService.saveNew(actionNew);
    } else throw new BadRequestException();
  }

  async getQuantity(id: number, loggedUser: User): Promise<number> {
    const actionsFounds: Action[] = await this.actionService.getAllByUser(
      loggedUser,
    );
    let variationTotale = 0;
    actionsFounds.forEach(action => {
      variationTotale += action.quantity;
    });
    const stocksFound = (await this.stocksRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    return stocksFound.quantity + variationTotale;
  }

  async getActions(id: number, loggedUser: User): Promise<Action[]> {
    const stocksFound = (await this.stocksRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    return await this.actionService.getAllByStocks(stocksFound, loggedUser);
  }
}
