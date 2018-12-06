import { TodolistItem } from './todolist-item.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodolistItemRepository } from './todolist-item.repository';
import {} from './todolist-item.constants';
import { TodolistItemDto } from './todolist-item.dto';
import Optional from 'typescript-optional';

@Injectable()
export class TodolistItemService {
  constructor(
    @InjectRepository(TodolistItemRepository)
    private readonly todolistItemRepository: TodolistItemRepository,
  ) {}

  async getAll(): Promise<TodolistItem[]> {
    return this.todolistItemRepository.find({});
  }

  async getOneById(id: number): Promise<Optional<TodolistItem>> {
    return this.todolistItemRepository.findOneById(id);
  }

  async saveNew(body: TodolistItemDto): Promise<TodolistItem> {
    let todolistItemNew = new TodolistItem();

    // Complete with the mappings

    todolistItemNew = await this.todolistItemRepository.save(todolistItemNew);

    return todolistItemNew;
  }

  async update(id: number, body: TodolistItemDto): Promise<TodolistItem> {
    let todolistItemFound = (await this.todolistItemRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());

    // Complete with the mappings

    todolistItemFound = await this.todolistItemRepository.save(
      todolistItemFound,
    );

    return todolistItemFound;
  }

  async deleteById(id: number): Promise<void> {
    const todolistItemFound = (await this.todolistItemRepository.findOneById(
      id,
    )).orElseThrow(() => new NotFoundException());
    await this.todolistItemRepository.remove(todolistItemFound);
  }
}
