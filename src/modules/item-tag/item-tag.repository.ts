import { EntityRepository, Repository } from 'typeorm';
import { ItemTag } from './item-tag.entity';
import Optional from 'typescript-optional';

@EntityRepository(ItemTag)
export class ItemTagRepository extends Repository<ItemTag> {
  async findOneById(id: number): Promise<Optional<ItemTag>> {
    return Optional.ofNullable(await this.findOne(id, {}));
  }
}
