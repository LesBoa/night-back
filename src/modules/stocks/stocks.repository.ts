import { EntityRepository, Repository } from 'typeorm';
import { Stocks } from './stocks.entity';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';

@EntityRepository(Stocks)
export class StocksRepository extends Repository<Stocks> {
  async findOneById(id: number, user: User): Promise<Optional<Stocks>> {
    return Optional.ofNullable(
      await this.findOne({
        where: { id, user },
      }),
    );
  }

  async findAllByUser(user: User): Promise<Stocks[]> {
    return await this.find({
      where: { user },
    });
  }
}
