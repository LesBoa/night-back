import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodolistItemController } from './todolist-item.controller';
import { TodolistItemService } from './todolist-item.service';
import { TodolistItem } from './todolist-item.entity';
import { TodolistItemRepository } from './todolist-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TodolistItem, TodolistItemRepository])],
  controllers: [TodolistItemController],
  providers: [TodolistItemService],
  exports: [TodolistItemService],
})
export class TodolistItemModule {}
