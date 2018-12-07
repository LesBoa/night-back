import { EntityRepository, Repository } from 'typeorm';
import { ItemTag } from './item-tag.entity';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';

@EntityRepository(ItemTag)
export class ItemTagRepository extends Repository<ItemTag> {
  async findOneById(id: number, user: User): Promise<Optional<ItemTag>> {
    return Optional.ofNullable(
      await this.findOne({
        where: { id, user },
      }),
    );
  }

  async findAllByUser(user: User): Promise<ItemTag[]> {
    return await this.find({
      where: { user },
    });
  }
}
