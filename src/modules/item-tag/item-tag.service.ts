import { ItemTag } from './item-tag.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemTagRepository } from './item-tag.repository';
import { ItemTagDto } from './item-tag.dto';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';

@Injectable()
export class ItemTagService {
  constructor(
    @InjectRepository(ItemTagRepository)
    private readonly itemTagRepository: ItemTagRepository,
  ) {}

  async getAll(): Promise<ItemTag[]> {
    return this.itemTagRepository.find({});
  }

  async getAllByUser(user: User): Promise<ItemTag[]> {
    return this.itemTagRepository.findAllByUser(user);
  }

  async getOneById(id: number, loggedUser: User): Promise<Optional<ItemTag>> {
    return this.itemTagRepository.findOneById(id, loggedUser);
  }

  async saveNew(body: ItemTagDto, loggedUser: User): Promise<ItemTag> {
    let itemTagNew = new ItemTag();

    itemTagNew.name = body.name;
    itemTagNew.color = body.color;
    itemTagNew.todolistItem = body.todolistItem;
    itemTagNew.user = loggedUser;

    itemTagNew = await this.itemTagRepository.save(itemTagNew);

    return itemTagNew;
  }

  async update(
    id: number,
    body: ItemTagDto,
    loggedUser: User,
  ): Promise<ItemTag> {
    let itemTagFound = (await this.itemTagRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());

    itemTagFound.name = body.name;
    itemTagFound.color = body.color;
    itemTagFound.todolistItem = body.todolistItem;

    itemTagFound = await this.itemTagRepository.save(itemTagFound);

    return itemTagFound;
  }

  async deleteById(id: number, loggedUser: User): Promise<void> {
    const itemTagFound = (await this.itemTagRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    await this.itemTagRepository.remove(itemTagFound);
  }
}
