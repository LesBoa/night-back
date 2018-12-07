import { Action } from './action.entity';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionRepository } from './action.repository';
import { ActionDto } from './action.dto';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';
import { StocksService } from '../stocks/stocks.service';
import { Stocks } from '../stocks/stocks.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(ActionRepository)
    private readonly actionRepository: ActionRepository,
    @Inject(forwardRef(() => StocksService))
    private readonly stockServices: StocksService,
  ) {}

  async getAll(): Promise<Action[]> {
    return this.actionRepository.find({});
  }

  async getAllByStocks(stock: Stocks, loggedUser: User): Promise<Action[]> {
    return this.actionRepository.findAllByStock(stock, loggedUser);
  }

  async getAllByUser(loggedUser: User): Promise<Action[]> {
    return await this.actionRepository.findAllByUser(loggedUser);
  }

  async getOneById(id: number, loggedUser: User): Promise<Optional<Action>> {
    return this.actionRepository.findOneById(id, loggedUser);
  }

  async saveNew(action: Action): Promise<Action> {
    return await this.actionRepository.save(action);
  }

  async update(id: number, body: ActionDto, loggedUser: User): Promise<Action> {
    let actionFound = (await this.actionRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());

    // Complete with the mappings

    actionFound = await this.actionRepository.save(actionFound);

    return actionFound;
  }

  async deleteById(id: number, loggedUser: User): Promise<void> {
    const actionFound = (await this.actionRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    await this.actionRepository.remove(actionFound);
  }
}
