import { EntityRepository, Repository } from 'typeorm';
import { TodolistItem } from './todolist-item.entity';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';

@EntityRepository(TodolistItem)
export class TodolistItemRepository extends Repository<TodolistItem> {
  async findOneById(id: number, user: User): Promise<Optional<TodolistItem>> {
    return Optional.ofNullable(
      await this.findOne({
        where: { id, user },
      }),
    );
  }

  async findAllByUser(user: User): Promise<TodolistItem[]> {
    return await this.find({
      where: { user },
    });
  }
}
