import { EntityRepository, Repository } from 'typeorm';
import { TodolistItem } from './todolist-item.entity';
import Optional from 'typescript-optional';

@EntityRepository(TodolistItem)
export class TodolistItemRepository extends Repository<TodolistItem> {
  async findOneById(id: number): Promise<Optional<TodolistItem>> {
    return Optional.ofNullable(await this.findOne(id, {}));
  }
}
