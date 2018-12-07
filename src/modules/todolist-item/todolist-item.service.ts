import { TodolistItem } from './todolist-item.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodolistItemRepository } from './todolist-item.repository';
import { TodolistItemDto } from './todolist-item.dto';
import Optional from 'typescript-optional';
import { User } from '../user/user.entity';

@Injectable()
export class TodolistItemService {
  constructor(
    @InjectRepository(TodolistItemRepository)
    private readonly todolistItemRepository: TodolistItemRepository,
  ) {}

  async getAll(): Promise<TodolistItem[]> {
    return this.todolistItemRepository.find({});
  }

  async getOneById(
    id: number,
    loggedUser: User,
  ): Promise<Optional<TodolistItem>> {
    return this.todolistItemRepository.findOneById(id, loggedUser);
  }

  async getAllByUser(user: User): Promise<TodolistItem[]> {
    return this.todolistItemRepository.findAllByUser(user);
  }

  async saveNew(
    body: TodolistItemDto,
    loggedUser: User,
  ): Promise<TodolistItem> {
    let todolistItemNew = new TodolistItem();

    todolistItemNew.title = body.title;
    todolistItemNew.description = body.description;
    todolistItemNew.startTime = body.startTime;
    todolistItemNew.endTime = body.endTime;
    todolistItemNew.isPriority = body.isPriority;
    todolistItemNew.isFavorite = body.isFavorite;
    todolistItemNew.isDone = body.isDone;
    todolistItemNew.tags = body.tags;
    todolistItemNew.user = loggedUser;

    todolistItemNew = await this.todolistItemRepository.save(todolistItemNew);

    return todolistItemNew;
  }

  async update(
    id: number,
    body: TodolistItemDto,
    loggedUser: User,
  ): Promise<TodolistItem> {
    let todolistItemFound = (await this.todolistItemRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());

    todolistItemFound.title = body.title;
    todolistItemFound.description = body.description;
    todolistItemFound.startTime = body.startTime;
    todolistItemFound.endTime = body.endTime;
    todolistItemFound.isPriority = body.isPriority;
    todolistItemFound.isFavorite = body.isFavorite;
    todolistItemFound.isDone = body.isDone;
    todolistItemFound.tags = body.tags;

    todolistItemFound = await this.todolistItemRepository.save(
      todolistItemFound,
    );

    return todolistItemFound;
  }

  async deleteById(id: number, loggedUser: User): Promise<void> {
    const todolistItemFound = (await this.todolistItemRepository.findOneById(
      id,
      loggedUser,
    )).orElseThrow(() => new NotFoundException());
    await this.todolistItemRepository.remove(todolistItemFound);
  }
}
