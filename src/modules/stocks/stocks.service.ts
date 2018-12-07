import { Stocks } from './stocks.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StocksRepository } from './stocks.repository';
import { StocksDto } from './stocks.dto';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';
import { CurrentUser } from '../../decorators/currentUser.decorator';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(StocksRepository)
    private readonly stocksRepository: StocksRepository,
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
}
