import { EntityRepository, Repository } from 'typeorm';
import { Journal } from './journal.entity';
import Optional from 'typescript-optional';
import { User } from 'modules/user/user.entity';

@EntityRepository(Journal)
export class JournalRepository extends Repository<Journal> {
  async findOneById(id: number, user: User): Promise<Optional<Journal>> {
    return Optional.ofNullable(
      await this.findOne({
        where: { id, user },
      }),
    );
  }

  async findAllByUser(user: User): Promise<Journal[]> {
    return await this.find({
      where: { user },
    });
  }
}
