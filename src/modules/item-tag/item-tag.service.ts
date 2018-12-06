import { ItemTag } from './item-tag.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemTagRepository } from './item-tag.repository';
import {} from './item-tag.constants';
import { ItemTagDto } from './item-tag.dto';
import Optional from 'typescript-optional';

@Injectable()
export class ItemTagService {
  constructor(
    @InjectRepository(ItemTagRepository)
    private readonly itemTagRepository: ItemTagRepository,
  ) {}

  async getAll(): Promise<ItemTag[]> {
    return this.itemTagRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<ItemTag>> {
    return this.itemTagRepository.findOneById(id);
  }

  async saveNew(body: ItemTagDto): Promise<ItemTag> {
    let itemTagNew = new ItemTag();

    // Complete with the mappings

    itemTagNew = await this.itemTagRepository.save(itemTagNew);

    return itemTagNew;
  }

  async update(id: number, body: ItemTagDto): Promise<ItemTag> {
    let itemTagFound = (await this.itemTagRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());

    // Complete with the mappings

    itemTagFound = await this.itemTagRepository.save(itemTagFound);

    return itemTagFound;
  }

  async deleteById(id: number): Promise<void> {
    const itemTagFound = (await this.itemTagRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    await this.itemTagRepository.remove(itemTagFound);
  }
}
