import { EntityRepository, Repository } from 'typeorm';
import { Action } from './action.entity';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';
import { Stocks } from '../stocks/stocks.entity';

@EntityRepository(Action)
export class ActionRepository extends Repository<Action> {
  async findOneById(id: number, user: User): Promise<Optional<Action>> {
    return Optional.ofNullable(
      await this.findOne({
        where: { id, user },
      }),
    );
  }

  async findAllByUser(user: User): Promise<Action[]> {
    return await this.find({
      where: { user },
    });
  }

  async findAllByStock(stock: Stocks, user: User): Promise<Action[]> {
    return await this.find({
      where: { user, stock },
    });
  }
}
